import React, { useState, useEffect } from 'react';
import { getProductInventories, getThings } from '../services/ProductServices';

function ProductFilter() {

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const category = await getThings(4, 1, token, "category");
      const brand = await getThings(6, 1, token, "brand");
      const size = await getProductInventories(token, "size");
      const color = await getProductInventories(token, "color");

      setCategories(category.data);
      setBrands(brand.data);
      setSizes(size.data);
      setColors(color.data);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
      <div className="divide-y divide-gray-200 space-y-5">
        <div>
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
          <div className="space-y-2">

            {categories.map((item) =>

              <div className="flex items-center" key={item.id}>
                <input type="checkbox" id={"cat-" + item.id}
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                <label className="text-gray-600 ml-3 cusror-pointer">{item.name}</label>
                <div className="ml-auto text-gray-600 text-sm">(15)</div>
              </div>

            )}

          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Brands</h3>
          <div className="space-y-2">

            {brands.map((item) =>
              <div className="flex items-center" key={item.id}>
                <input type="checkbox" id={"brand-" + item.id}
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                <label className="text-gray-600 ml-3 cusror-pointer">{item.name}</label>
                <div className="ml-auto text-gray-600 text-sm">(15)</div>
              </div>
            )}

          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
          <div className="mt-4 flex items-center">
            <input type="text" name="min" id="min"
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
              placeholder="min" />
            <span className="mx-3 text-gray-500">-</span>
            <input type="text" name="max" id="max"
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
              placeholder="max" />
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">size</h3>
          <div className="grid grid-cols-5 items-center gap-2">

            {sizes.map((item) =>
              <div className="size-selector" key={item}>
                <input type="radio" name="size" id={"size" + item} className="hidden" />
                <label htmlFor={"size" + item}
                  className="text-lg border border-gray-200 rounded-sm h-8 w-8 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">{item}</label>
              </div>
            )}

          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
          <div className="grid grid-cols-6 items-center">

            {colors.map((item) =>
              <div className="color-selector py-2" key={item}>
                <input type="radio" name="color" id={item} className="hidden" />
                <label htmlFor={item}
                  className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                  style={{ backgroundColor: "#" + item }}></label>
              </div>
            )}

          </div>
          
        </div>

      </div>
    </div >
  )
}

export default ProductFilter;