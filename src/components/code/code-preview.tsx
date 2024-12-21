"use client"

import React from "react"
import { useQueryState } from "nuqs"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { parseAsType, TYPE_KEY, TYPES } from "@/constants/views"

// TODO: Update tabs list style

const CodePreview = () => {
  const [value, setValue] = useQueryState(
    TYPE_KEY,
    parseAsType.withDefault(TYPES[0].value)
  )

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="h-full bg-background"
    >
      <TabsList className="bg-transparent p-0">
        {TYPES.map((type) => (
          <TabsTrigger key={type.value} value={type.value} className="">
            {type.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {TYPES.map((type) => (
        <TabsContent key={type.value} value={type.value}>
          {type.title}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default CodePreview
