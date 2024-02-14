import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';

const POSPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get('products');
      setProducts(result.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProductToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
  
    if (existingProduct) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === product.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + selectedQuantity,
              totalAmount: cartItem.price * (cartItem.quantity + selectedQuantity),
            }
          : cartItem
      );
  
      setCart(updatedCart);
      toast(`Successfully added ${product.name} to cart.`);
    } else {
      const addingProduct = {
        ...product,
        quantity: selectedQuantity,
        totalAmount: product.price * selectedQuantity,
      };
      setCart([...cart, addingProduct]);
      toast(`Successfully added ${product.name} to cart.`);
    }
  
    // Reset selected quantity after adding item
    setSelectedQuantity(1);
  };
  

  const removeProduct = async (product) => {
    const newCart = cart.filter(cartItem => cartItem.id !== product.id);
    setCart(newCart);
  };

  const incrementQuantity = () => {
    setSelectedQuantity(selectedQuantity + 1);
  };

  const decrementQuantity = () => {
    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach(icart => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    })
    setTotalAmount(newTotalAmount);
  }, [cart])

  return (
    <MainLayout>
      <div className='w-full flex md:flex-row flex-col'>
        <div className='lg:w-[60%] md:w-1/2 w-full'>
          {isLoading ? (
            'Loading'
          ) : (
            <div className='flex flex-wrap'>
              {products.map((product, key) => (
                <div key={key} className='w-1/2 sm:w-1/2 md:w-full lg:w-1/2 xl:w-1/3 p-4'>
                  <div className='p-2'>
                    <img src={product.image} alt={product.name} className='w-full h-auto rounded-lg' />

                    <div className='flex justify-center items-center mt-4'>
                      <p className='font-semibold mx-2 text-lg'>{product.name}</p>
                      <p className='text-slate-500 font-semibold'>(₱{product.price})</p>
                    </div>

                    <div className='flex flex-row justify-between items-center mx-2 my-4'>
                      <div className='flex flex-row justify-center items-center bg-gray-300 rounded-full p-1 md:p-2 '>
                        <button className='rounded-full bg-gray-100 p-1' onClick={decrementQuantity}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-3 h-3 md:w-5 md:h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                          </svg>
                        </button>

                        <span className='mx-4'>{selectedQuantity}</span>

                        <button className='rounded-full bg-gray-100 p-1' onClick={incrementQuantity}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-3 h-3 md:w-5 md:h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </button>
                      </div>
                      <button className='bg-sky-600 py-2 px-4 rounded-full text-xs sm:text-sm md:text-base text-white' onClick={() => addProductToCart(product)}>Add Item</button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/*--------------------------- CART LIST -------------------------*/}
        <div className='lg:w-[40%] min-h-screen'>
          <div style={{ display: "none" }}>
            <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
          </div>
          <div className='w-full'>
            <table className='w-full '>
              <thead className=''>
                <tr className='text-white bg-black h-[3.5rem]'>
                  <td className='px-2'>#</td>
                  <td className='px-2'>Image</td>
                  <td className='px-2'>Product Name</td>
                  <td className='px-2'>Price</td>
                  <td className='px-2'>Qty</td>
                  <td className='px-2'>Amount</td>
                  <td className='px-2'>Action</td>
                </tr>
              </thead>
              <tbody className=''>
                {cart ? (
                  cart.map((cartProduct, key) => (
                    <tr key={key} className={key % 2 === 0 ? 'bg-gray-200 h-[3.5rem]' : 'bg-white h-[3.5rem]'}>
                      <td className='px-2'>{cartProduct.id}</td>
                      <td><img className='px-1 h-[4rem] rounded-lg' src={cartProduct.image} alt={cartProduct.name} /></td>
                      <td className='px-2'>{cartProduct.name}</td>
                      <td className='px-2'>{cartProduct.price}</td>
                      <td className='px-2'>{cartProduct.quantity}</td>
                      <td className='px-2'>₱{cartProduct.totalAmount}</td>
                      <td className='px-2'>
                        <button className='border text-white bg-red-600 rounded-lg p-2' onClick={() => removeProduct(cartProduct)}>Remove</button>
                      </td>
                    </tr>
                  ))
                ) : 'No Item in Cart'}
              </tbody>
            </table>
            <h2 className='bg-black  text-white text-2xl p-4 text-center'>Total Amount: <span className='font-bold'>₱{totalAmount}</span></h2>
          </div>

          <div className='mt-3 flex justify-center'>
            {totalAmount !== 0 ?
              <div>
                <button className='py-2 px-4 font-bold text-lg rounded-lg bg-sky-600 text-white transition duration-300 hover:scale-105' onClick={handlePrint}>
                  Pay Now
                </button>
              </div>
              : 'Please add a product to the cart.'}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default POSPage;
