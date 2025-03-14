import { Button } from "@/components/ui/button"
import CatalogLinkButton from "../interface/CatalogLinkButton"

export default function BannerHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <video
        src="/assets/video.mp4"
        autoPlay
        preload="auto" 
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">
        <div className="container mx-auto h-full flex items-center">
          <div className="max-w-2xl space-y-8">
            <h1 className="font-bold text-white max-[1380px]:text-[72px] max-[1380px]:leading-[81px] max-[1260px]:text-[64px] max-[1260px]:leading-[72px] max-[1130px]:text-[60px] max-[1130px]:leading-[67px] max-[1070px]:text-[56px] max-[1070px]:leading-[63px] max-[360px]:text-[50px] max-[360px]:leading-[55px] max-[350px]:text-[47px] max-[350px]:leading-[52px] max-[330px]:text-[44px] max-[330px]:leading-[49px]">
              Міцність та
              <br />
              <span className="text-neutral-300">Зручність</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 max-w-xl">
              Відкрийте екіпірування для тих, хто цінує якість, надійність та сучасні військовий стандарти.
            </p>
            <div className="flex gap-4 max-[465px]:flex-col">
              <CatalogLinkButton link="/catalog?page=1&sort=default">
                <Button size="lg" className="bg-white text-black rounded-none hover:bg-neutral-200 px-8 py-6 text-lg max-[465px]:w-full">
                  Замовити
                </Button>
              </CatalogLinkButton>
              <CatalogLinkButton link="/catalog?page=1&sort=default">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white rounded-none hover:bg-white/10 px-8 py-6 text-lg max-[465px]:w-full"
                >
                  Дивитися колекцію
                </Button>
              </CatalogLinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

