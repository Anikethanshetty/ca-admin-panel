import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEmployeeCategories } from "@/hooks/manageEmployees/getCategory"


export function CategorySelect({ onSelect }: { onSelect: (category: { id: string; name: string }) => void }) {
    const { categories, loading, error } = useEmployeeCategories()
    const [selectedCategory, setSelectedCategory] = React.useState<{ id: string; name: string } | null>(null)
  
    const handleSelect = (categoryId: string) => {
      const selected = categories.find((category) => category.category_id === categoryId)
      if (selected) {
        const selectedData = { id: selected.category_id, name: selected.category_name }
        setSelectedCategory(selectedData)
        onSelect(selectedData) 
      }
    }
  
    if (loading) return <p>Loading categories...</p>
    if (error) return <p className="text-red-500">{error}</p>
  
    return (
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {categories.map((category) => (
              <SelectItem key={category.category_id} value={category.category_id}>
                {category.category_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }
  