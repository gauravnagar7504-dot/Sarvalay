import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export default async function DashboardSyncPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    redirect("/");
  }

  // Find or create user in Supabase via Prisma
  let dbUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!dbUser) {
    // Determine default role: Check public metadata, or assign based on user list
    let role: Role = Role.CLIENT;
    
    const clerkRole = user.publicMetadata?.role as string;
    if (clerkRole === "ADMIN" || clerkRole === "admin") {
      role = Role.ADMIN;
    } else if (clerkRole === "ARTIST" || clerkRole === "artist") {
      role = Role.ARTIST;
    } else if (
      email === "gaurav@sarvalay.com" || 
      email.endsWith("@sarvalay.com") || 
      email === "gauravmodi8440@gmail.com"
    ) {
      // Add standard developer/client admin emails to bypass manual metadata assignment
      role = Role.ADMIN;
    }

    dbUser = await prisma.user.create({
      data: {
        email,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Sarvalay User",
        role,
      },
    });

    // If they are an artist, create a profile automatically
    if (role === Role.ARTIST) {
      await prisma.artistProfile.create({
        data: {
          userId: dbUser.id,
          tier: "TIER_3",
          specialties: ["General Murals"],
          bio: "Joined Sarvalay Artist Network",
        },
      });
    }
  }

  // Redirect based on the synced role
  if (dbUser.role === Role.ADMIN) {
    redirect("/dashboard/admin");
  } else if (dbUser.role === Role.ARTIST) {
    redirect("/dashboard/artist");
  } else {
    redirect("/dashboard/client");
  }
}
