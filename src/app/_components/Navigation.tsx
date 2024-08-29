"use client"
import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Logo from "./Logo"
import { trpc } from "../_trpc/client"
import { Loader2 } from "lucide-react"


export function Navigation() {
  const { data, isLoading } = trpc.getCategories.useQuery();

  if (isLoading) {
    return <Loader2 className="w-6 h-6 text-slate-200 animate-spin" />
  }

  return (
    <NavigationMenu
      className="hidden md:block"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Our Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Logo />
                  </a>
                </NavigationMenuLink>
              </li>
              <Link href="/about-us">
                <ListItem title="About Us" />
              </Link>
              <Link href="/compliance">
                <ListItem href="/docs" title="Compliance" />
              </Link>
              <Link href="why-us">
                <ListItem title="Why Us" />
              </Link>
              <Link href="/key-contact">
                <ListItem href="/docs" title="Key Contacts" />
              </Link>
              <Link href="/job">
                <ListItem href="/docs" title="Job" />
              </Link>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[550px] ">
              {data?.map((component) => (
                <ListItem
                  key={component.id}
                  title={component.name}
                  className="line-clamp-none"
                >
                  {
                    component.subCategory.map(e => {
                      return <div role="button" className="text-center py-1 border border-x-0 border-t-0 border-b-cyan-900 duration-300 hover:scale-110 dark:hover:text-slate-50 hover:text-slate-950" key={e.id}>
                        {e.name}
                      </div>
                    })
                  }
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Our Services
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className=" text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
