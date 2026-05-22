'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { LeadStatus, ProjectStatus, MilestoneType, ArtistTier } from '@prisma/client';

/**
 * Lead Actions
 */
export async function createLead(formData: {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  serviceType: string;
  location?: string;
  dimensions?: string;
  budget?: string;
  timeline?: string;
  style?: string;
  notes?: string;
}) {
  try {
    const preferences = formData.style ? [formData.style] : [];
    if (formData.notes) {
      preferences.push(`Notes: ${formData.notes}`);
    }
    if (formData.location) {
      preferences.push(`Location: ${formData.location}`);
    }
    if (formData.budget) {
      preferences.push(`Budget: ${formData.budget}`);
    }
    if (formData.timeline) {
      preferences.push(`Timeline: ${formData.timeline}`);
    }

    const lead = await prisma.lead.create({
      data: {
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Personal Space',
        industry: formData.industry || 'Other',
        serviceType: formData.serviceType || 'Wall Murals',
        preferences,
        status: LeadStatus.SUBMITTED,
      },
    });

    revalidatePath('/dashboard/admin/leads');
    revalidatePath('/dashboard/admin');
    return { success: true, leadId: lead.id };
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return { success: false, error: error.message };
  }
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  try {
    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: { status },
    });
    revalidatePath('/dashboard/admin/leads');
    revalidatePath('/dashboard/admin');
    return { success: true, lead };
  } catch (error: any) {
    console.error('Error updating lead:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Artist Actions & Syncing
 */
export async function submitArtistApplication(formData: {
  name: string;
  email: string;
  phone: string;
  city: string;
  style: string;
  experience: string;
  portfolio: string;
  bio: string;
}) {
  try {
    // Save artist application as a Lead of type "ARTIST_APPLY" or create their User/Profile directly
    // Let's create a User and an ArtistProfile for them so that they can log in instantly,
    // but default their availability to false until they are approved!
    let user = await prisma.user.findUnique({
      where: { email: formData.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: formData.email,
          name: formData.name,
          role: 'ARTIST',
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 'ARTIST' },
      });
    }

    const profile = await prisma.artistProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        tier: formData.experience.includes('10+') ? ArtistTier.TIER_1_ELITE : formData.experience.includes('6-9') ? ArtistTier.TIER_2_PRO : ArtistTier.TIER_3,
        specialties: [formData.style],
        isAvailable: false, // Must be verified by admin first
        bio: `${formData.bio} | City: ${formData.city} | Experience: ${formData.experience} | Portfolio: ${formData.portfolio}`,
      },
      update: {
        specialties: [formData.style],
        bio: `${formData.bio} | City: ${formData.city} | Experience: ${formData.experience} | Portfolio: ${formData.portfolio}`,
      }
    });

    revalidatePath('/dashboard/admin/artists');
    return { success: true, profileId: profile.id };
  } catch (error: any) {
    console.error('Error submitting artist application:', error);
    return { success: false, error: error.message };
  }
}

export async function updateArtistAvailability(profileId: string, isAvailable: boolean) {
  try {
    const profile = await prisma.artistProfile.update({
      where: { id: profileId },
      data: { isAvailable },
    });
    revalidatePath('/dashboard/admin/artists');
    return { success: true, profile };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateArtistTier(profileId: string, tier: ArtistTier) {
  try {
    const profile = await prisma.artistProfile.update({
      where: { id: profileId },
      data: { tier },
    });
    revalidatePath('/dashboard/admin/artists');
    return { success: true, profile };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Project Actions
 */
export async function createProject(data: {
  title: string;
  company: string;
  clientEmail: string;
  clientName: string;
  artistId?: string;
  advanceAmount: number;
}) {
  try {
    // 1. Resolve or create client
    let client = await prisma.user.findUnique({
      where: { email: data.clientEmail },
    });

    if (!client) {
      client = await prisma.user.create({
        data: {
          email: data.clientEmail,
          name: data.clientName,
          role: 'CLIENT',
        },
      });
    }

    // 2. Create the Project
    const project = await prisma.project.create({
      data: {
        title: data.title,
        company: data.company,
        clientId: client.id,
        artistId: data.artistId || null,
        status: ProjectStatus.MOCKUP_PHASE,
        progress: 0,
      },
    });

    // 3. Automatically generate the 50-30-20 Invoices for premium self-sustaining financial automation
    const totalAmount = data.advanceAmount * 2; // Treat the 50% advance as half the budget
    
    await prisma.invoice.createMany({
      data: [
        {
          projectId: project.id,
          amount: data.advanceAmount,
          milestone: MilestoneType.ADVANCE_50,
          refId: `INV-${project.id.slice(0, 4).toUpperCase()}-50`,
          isPaid: false,
        },
        {
          projectId: project.id,
          amount: totalAmount * 0.3,
          milestone: MilestoneType.MID_30,
          refId: `INV-${project.id.slice(0, 4).toUpperCase()}-30`,
          isPaid: false,
        },
        {
          projectId: project.id,
          amount: totalAmount * 0.2,
          milestone: MilestoneType.DELIVERY_20,
          refId: `INV-${project.id.slice(0, 4).toUpperCase()}-20`,
          isPaid: false,
        },
      ]
    });

    revalidatePath('/dashboard/admin/projects');
    revalidatePath('/dashboard/client/projects');
    revalidatePath('/dashboard/admin');
    return { success: true, projectId: project.id };
  } catch (error: any) {
    console.error('Error creating project:', error);
    return { success: false, error: error.message };
  }
}

export async function assignArtistToProject(projectId: string, artistId: string | null) {
  try {
    const project = await prisma.project.update({
      where: { id: projectId },
      data: { artistId },
    });
    revalidatePath('/dashboard/admin/projects');
    revalidatePath('/dashboard/client/projects');
    revalidatePath('/dashboard/artist/projects');
    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProjectProgress(projectId: string, progress: number, status?: ProjectStatus) {
  try {
    const updateData: any = { progress };
    if (status) {
      updateData.status = status;
    } else if (progress >= 100) {
      updateData.status = ProjectStatus.COMPLETED;
    } else if (progress >= 80) {
      updateData.status = ProjectStatus.QA_CHECK;
    } else if (progress > 0) {
      updateData.status = ProjectStatus.EXECUTING;
    }

    const project = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
    });

    revalidatePath('/dashboard/admin/projects');
    revalidatePath('/dashboard/client/projects');
    revalidatePath('/dashboard/artist/projects');
    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Invoice & Payments
 */
export async function toggleInvoicePayment(invoiceId: string, isPaid: boolean) {
  try {
    const invoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        isPaid,
        paidAt: isPaid ? new Date() : null,
      },
      include: {
        project: true
      }
    });

    // If payment goes through, let's update artist statistics if they are assigned
    if (invoice.project.artistId) {
      const artistProfile = await prisma.artistProfile.findUnique({
        where: { userId: invoice.project.artistId }
      });
      if (artistProfile) {
        const addedAmount = invoice.amount;
        await prisma.artistProfile.update({
          where: { userId: invoice.project.artistId },
          data: {
            earningsPaid: isPaid ? { increment: addedAmount } : { decrement: addedAmount },
            earningsPend: isPaid ? { decrement: addedAmount } : { increment: addedAmount }
          }
        });
      }
    }

    revalidatePath('/dashboard/admin/finance');
    revalidatePath('/dashboard/client/invoices');
    revalidatePath('/dashboard/artist/earnings');
    return { success: true, invoice };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Mockup Engine
 */
export async function createMockup(projectId: string, title: string, imageUrl: string) {
  try {
    const mockup = await prisma.mockup.create({
      data: {
        projectId,
        title,
        imageUrl,
        isApproved: false,
      },
    });
    revalidatePath('/dashboard/admin/mockups');
    revalidatePath('/dashboard/client/mockups');
    return { success: true, mockup };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function approveMockup(mockupId: string, isApproved: boolean) {
  try {
    const mockup = await prisma.mockup.update({
      where: { id: mockupId },
      data: { isApproved },
    });
    revalidatePath('/dashboard/admin/mockups');
    revalidatePath('/dashboard/client/mockups');
    return { success: true, mockup };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Daily Progress Updates
 */
export async function addProgressPhoto(projectId: string, imageUrl: string, description: string) {
  try {
    const photo = await prisma.progressPhoto.create({
      data: {
        projectId,
        imageUrl,
        description,
      },
    });
    revalidatePath('/dashboard/admin/operations');
    revalidatePath('/dashboard/client/projects');
    return { success: true, photo };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
