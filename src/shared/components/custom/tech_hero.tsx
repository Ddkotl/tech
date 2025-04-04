import Image from "next/image";
import { Title } from "./app-title";

export default function TechHero() {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-b from-background to-muted rounded-md ">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Title size="xl" text="Новости и обзоры последних гаджетов"></Title>

              <p className="max-w-[600px] text-muted-foreground text-sm md:text-base">
                Актуальная информация о новинках мира технологий, подробные обзоры смартфонов и гаджетов от экспертов.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {" "}
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-xl lg:aspect-[4/5]">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Последние смартфоны и гаджеты"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0 p-6">
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-primary">Обзор недели</div>
                    <h3 className="text-xl font-bold text-foreground">iPhone 15 Pro Max: полный обзор</h3>
                    <p className="text-sm text-muted-foreground">Все особенности нового флагмана Apple</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
            <div className="relative h-16 w-16">
              <Image src="/placeholder.svg?height=64&width=64" alt="Смартфоны" fill className="object-contain" />
            </div>
            <div className="text-center text-sm font-medium">Смартфоны</div>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
            <div className="relative h-16 w-16">
              <Image src="/placeholder.svg?height=64&width=64" alt="Планшеты" fill className="object-contain" />
            </div>
            <div className="text-center text-sm font-medium">Планшеты</div>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
            <div className="relative h-16 w-16">
              <Image src="/placeholder.svg?height=64&width=64" alt="Ноутбуки" fill className="object-contain" />
            </div>
            <div className="text-center text-sm font-medium">Ноутбуки</div>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
            <div className="relative h-16 w-16">
              <Image src="/placeholder.svg?height=64&width=64" alt="Умные часы" fill className="object-contain" />
            </div>
            <div className="text-center text-sm font-medium">Умные часы</div>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 shadow-sm">
            <div className="relative h-16 w-16">
              <Image src="/placeholder.svg?height=64&width=64" alt="Аксессуары" fill className="object-contain" />
            </div>
            <div className="text-center text-sm font-medium">Аксессуары</div>
          </div>
        </div>
      </div>
    </section>
  );
}
