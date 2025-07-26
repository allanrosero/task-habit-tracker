'use client'
import { Home } from "lucide-react"
import { useAtomValue } from "jotai"
import { userAtom } from "@/atoms/auth"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"

const items = [
    {
        title: "Dashboard",
        url: "#",
        icon: Home,
    }
]


export function AppSidebar() {
    const user = useAtomValue(userAtom)

    return (
        <Sidebar>
            <SidebarContent>
                {user && (
                    <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                        Hello, {user.name || user.email}
                    </div>
                )}
                <Separator />
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}