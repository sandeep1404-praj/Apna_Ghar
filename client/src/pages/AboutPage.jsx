export const AboutPage = ()=>{
    return(<>
   <div className="container mx-auto px-4 py-12">
      {/* About Text Section */}
      <div className="text-center mb-8">
        <h6 className="text-lg font-semibold text-gray-600 uppercase">About Us</h6>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          "Move-In Ready! A Comfortable Space at an Unbeatable Price!"
        </p>
        <p className="text-gray-700 max-w-2xl mx-auto mt-2">
          "A Room That Feels Like Home – Secure It Before It's Gone!"
        </p>
      </div>

      {/* Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        <img src="flat 1.jpg" alt="Flat 1" className="rounded-lg shadow-lg w-full object-cover" />
        <img src="flat 2.jpg" alt="Flat 2" className="rounded-lg shadow-lg w-full object-cover" />
        <img src="flat 3.webp" alt="Flat 3" className="rounded-lg shadow-lg w-full object-cover" />
      </div>
    </div>
    </>)
}