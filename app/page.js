import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function page({ searchParams }) {
  const sizeStr = searchParams?.select_size || ""
  const color1 = searchParams?.color1 || "#ffffff"
  const color2 = searchParams?.color2 || "#cccccc"

  let tableHtml = ""
  if (sizeStr) {
    const size = parseInt(sizeStr.split("x")[0], 10) || 0
    if (size > 0) {
      let html = `<table style="border-collapse: collapse;">`
      for (let i = 1; i <= size; i++) {
        html += "<tr>"
        for (let j = 1; j <= size; j++) {
          const bgColor = (i + j) % 2 === 0 ? color1 : color2
          html += `
            <td style="background-color:${bgColor}; padding:10px; border:1px solid black; text-align:center;">
              ${i * j}
            </td>
          `
        }
        html += "</tr>"
      }
      html += "</table>"
      tableHtml = html
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    <Card className="w-[350px] m-4">
      <CardHeader>
        <CardTitle>Tabliczka mnożenia</CardTitle>
        <CardDescription>
          Wybierz wielkość i kolory, a następnie kliknij „Wyświetl”
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form method="GET">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="size">Ustal wielkość</Label>
              <Select name="select_size" defaultValue={sizeStr}>
                <SelectTrigger id="size">
                  <SelectValue placeholder="Wielkość" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1x1">1x1</SelectItem>
                  <SelectItem value="2x2">2x2</SelectItem>
                  <SelectItem value="5x5">5x5</SelectItem>
                  <SelectItem value="15x15">15x15</SelectItem>
                </SelectContent>
              </Select>

              {/* Pola color – tu użyjemy np. <Input> z shadcn, jeśli chcesz */}
              <Label htmlFor="color1">Kolor 1</Label>
              <Input id="color1" type="color" name="color1" defaultValue={color1} />

              <Label htmlFor="color2">Kolor 2</Label>
              <Input id="color2" type="color" name="color2" defaultValue={color2} />
            </div>
          </div>
          <Button type="submit" className="mt-4">
            Wyświetl
          </Button>
        </form>
        {tableHtml && (
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: tableHtml }}
          />
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
    </main>
    </div>
  )
}
