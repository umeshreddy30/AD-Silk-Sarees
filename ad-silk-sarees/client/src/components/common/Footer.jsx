export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e8dccc] bg-[#f0e8d8]">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-[#6B1C2E]">AD Silk Sarees</p>
          <p className="mt-2 text-sm text-[#3D2030]">Pure silk. Trusted craft. Direct from heritage clusters.</p>
        </div>

        <div>
          <p className="font-serif text-lg text-[#1A0A0F]">Contact Us</p>
          <div className="mt-2 space-y-1 text-sm text-[#3D2030]">
            <p>
              <span className="font-medium text-[#1A0A0F]">Phone:</span>{' '}
              <a className="hover:underline" href="tel:+919999999999">+91 99999 99999</a>
            </p>
            <p>
              <span className="font-medium text-[#1A0A0F]">Email:</span>{' '}
              <a className="hover:underline" href="mailto:adsilksarees@example.com">adsilksarees@example.com</a>
            </p>
            <p>
              <span className="font-medium text-[#1A0A0F]">WhatsApp:</span>{' '}
              <a className="hover:underline" href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </p>
            <p className="text-xs text-[#3D2030]">Location: Tamil Nadu, India</p>
          </div>
        </div>

        <div>
          <p className="font-serif text-lg text-[#1A0A0F]">About</p>
          <p className="mt-2 text-sm text-[#3D2030]">
            We curate handwoven silk sarees with an emphasis on authenticity, craftsmanship, and premium finishing.
          </p>
        </div>
      </div>
      <div className="border-t border-[#e8dccc] py-4 text-center text-xs text-[#3D2030]">
        © {new Date().getFullYear()} AD Silk Sarees. All rights reserved.
      </div>
    </footer>
  )
}
