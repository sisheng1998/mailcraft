"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const tabsListVariants = cva(
  cn("inline-flex items-center text-muted-foreground"),
  {
    variants: {
      variant: {
        default: cn("h-9 justify-center rounded-lg bg-muted p-1"),
        outline: cn("justify-start"),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>
>(({ className, variant, children, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  >
    {React.Children.map(children, (child) =>
      React.isValidElement<React.ComponentProps<typeof TabsTrigger>>(child)
        ? React.cloneElement(child, { variant } as Partial<
            React.ComponentProps<typeof TabsTrigger>
          >)
        : child
    )}
  </TabsPrimitive.List>
))
TabsList.displayName = TabsPrimitive.List.displayName

const tabsTriggerVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "rounded-md px-3 py-1 data-[state=active]:bg-background data-[state=active]:shadow"
        ),
        outline: cn(
          "relative border-b-2 border-b-transparent bg-transparent px-4 py-3 font-semibold shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:shadow-none"
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
