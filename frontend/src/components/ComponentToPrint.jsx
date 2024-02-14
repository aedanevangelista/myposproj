import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const {cart, totalAmount} = props;
    return (
      <div ref={ref} className="p-5">
          <table className='min-w-full  shadow-md rounded-xl text-lg'>
                  <thead className="bg-black">
                    <tr className="bg-blue-gray-100 text-white font-bold">
                      <td class="py-3 px-4 text-left">#</td>
                      <td class="py-3 px-4 text-left">Name</td>
                      <td class="py-3 px-4 text-left">Price</td>
                      <td class="py-3 px-4 text-left">Qty</td>
                      <td class="py-3 px-4 text-left">Total</td>
                    </tr>
                  </thead>
                  <tbody className="text-blue-gray-900">
                    {cart ? cart.map((cartProduct, key) => (
                        <tr key={key} className={key % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                        <td className="py-3 px-4">{cartProduct.id}</td>
                        <td className="py-3 px-4">{cartProduct.name}</td>
                        <td className="py-3 px-4">{cartProduct.price}</td>
                        <td className="py-3 px-4">{cartProduct.quantity}</td>
                        <td className="py-3 px-4">{cartProduct.totalAmount}</td>
                        </tr>
                    )) : ''}
                   </tbody>
                </table>
                <h2 className='text-center text-xl my-4'>Total Amount: <span className="font-bold">${totalAmount}</span></h2>
      </div>
    );
});