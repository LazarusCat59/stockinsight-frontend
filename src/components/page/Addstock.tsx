import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import { Sidebar } from '../Imports';
import Inputbox, { InputboxProps } from '../elements/Inputbox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getChoices, createStock } from '../../apicalls';
import { authContext } from '../../App';
import { Choices, LoginDetails } from '../../types';
import { FaComputer } from "react-icons/fa6";

const Addstock = () => {
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());
  const [billNo, setBillNo] = useState('');
  const [loc, setLoc] = useState('');
  const [stockName, setstockName] = useState('');
  const [locations, setLocations] = useState<Array<Choices>>([{ name: '', code: '' }]);
  const [conditions, setConditions] = useState<Array<Choices>>([{ name: '', code: '' }]);
  const [categories, setCategories] = useState<Array<Choices>>([{ name: '', code: '' }]);
  const { loginToken, setLoginToken, userRole, setUserRole } = useContext(authContext) as LoginDetails;

  useEffect(() => {
    getChoices(loginToken, 1).then(cat => {
      if (typeof cat !== 'undefined') {
        setLocations(cat.results);
      }
    });
    getChoices(loginToken, 2).then(cat => {
      if (typeof cat !== 'undefined') {
        setCategories(cat.results);
      }
    });
    getChoices(loginToken, 3).then(cat => {
      if (typeof cat !== 'undefined') {
        setConditions(cat.results);
      }
    });
  }, [loginToken]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'category':
        setCategory(value);
        break;
      case 'condition':
        setCondition(value);
        break;
      case 'location':
        setLoc(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const formData = {
      stockName,
      category,
      desc,
      date,
      itemCode,
      billNo,
      loc,
      condition
    };

		// const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
		// 	weekday: "long",
		// 	year: "numeric",
		// 	month: "numeric",
		// 	day: "numeric"
		// 	});
		// const parts = dateTimeFormat.formatToParts(date);
		// console.log(parts)
		let purchasedate = date.toISOString().slice(0,10)
		createStock(loginToken, stockName, category, desc, itemCode, billNo, purchasedate, loc);

    // console.log(formData);
  };

  return (
    <div className='flex bg-custom-light-gray text-custom-white'>
      <Sidebar />
      <div>
        <div className='flex justify-center w-[85rem] mt-3'>
          <div className='bg-custom-gray border rounded-full h-36 w-36'>
          <FaComputer className="w-36 h-36  text-custom-black object-cover aspect-square p-5 mx-auto"/>
          </div>
        </div>
        <div className='flex justify-center items-center w-[85rem] '>
          <Inputbox ph="stock name" tag="Name: " value={stockName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setstockName(e.target.value)} />
        </div>
        <div className='mx-64 mt-2'>
          <h1 className='text-xl font-semibold'>Stock Details:</h1>
          <div className='flex '>
            <div>
              <div className='mr-36'>
                <Inputbox ph="description" tag="Desc :" value={desc} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)} />
                <Inputbox ph="item code" tag="Code :" value={itemCode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemCode(e.target.value)} />
              <Inputbox ph="bill number" tag="BillNo: " value={billNo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillNo(e.target.value)} />

              <div className='flex mt-5'>
              <h1 className='text-xl font-semibold'>Date:</h1>
              <DatePicker className='ml-[1.8rem] w-56 border rounded-lg h-10 px-[4rem] border-custom-yellow bg-custom-black   focus:ring-blue-500 focus:border-custom-white text-custom-yellow bg-gradient-to-r mx-6  hover:bg-gradient-to-bl  hover:bg-custom-gray hover:text-white focus:ring-4 focus:outline-none  font-medium  py-2.5 text-center inline-flex items-center dark:bg-custom-black dark:hover:bg-custom-black dark:focus:ring-blue-700  p-5 appearance-none  focus:ring-opacity-75' selected={date} onChange={(date: Date) => setDate(date as Date)} />
              </div>
              </div>
            </div>
            <div>
      <div className=' flex mt-5'>
              <h1 className='text-xl font-semibold'>Category:</h1>
                <select name="category" id="location" className=" text-custom-yellow bg-gradient-to-r mx-6  bg-custom-black hover:bg-gradient-to-bl  hover:bg-custom-black hover:text-custom-white focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm ml-5  px-5 py-2.5 text-center inline-flex items-center dark:bg-custom-black dark:hover:bg-custom-black dark:focus:ring-blue-800   focus:border-custom-white  h-12 w-56 p-5 appearance-none  border border-custom-yellow  focus:ring-opacity-75" onChange={handleSelectChange} >
								<option value="">-- Select Category --</option>
                  {categories.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex mt-5'>
              <h1 className='text-xl font-semibold'>Condition:</h1>
                <select name="condition" id="location" className="  text-custom-yellow bg-gradient-to-r mx-6  bg-custom-black hover:bg-gradient-to-bl  hover:bg-custom-black hover:text-custom-white focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm ml-3  px-5 py-2.5 text-center inline-flex items-center dark:bg-custom-black dark:hover:bg-custom-black dark:focus:ring-blue-800   focus:border-custom-white  h-12 w-56 p-5 appearance-none  border border-custom-yellow  focus:ring-opacity-75" onChange={handleSelectChange} disabled>
								<option value="">-- Select Condition --</option>
                  {conditions.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>  
                <div className='flex mt-5'>
                  <h1 className='text-xl font-semibold'>Location:</h1>
                  <select name="location" id="location" className=" text-custom-yellow bg-gradient-to-r mx-6  bg-custom-black hover:bg-gradient-to-bl  hover:bg-custom-black hover:text-custom-white focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm ml-6  px-5 py-2.5 text-center inline-flex items-center dark:bg-custom-black dark:hover:bg-custom-black dark:focus:ring-blue-800   focus:border-custom-white  h-12 w-56 p-5 appearance-none  border border-custom-yellow  focus:ring-opacity-75" onChange={handleSelectChange} >
								<option value="">-- Select Location --</option>
                    {locations.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
      </div>
          </div>
        </div>
        <div>
        <div className='flex mt-3 ml-[14.5rem]'>
            <div className=' flex'>
              <label htmlFor="message" className="text-xl mt-8 font-semibold ">
                Remarks :
              </label>
              <textarea
                id="message"
                rows={2}
                className="block p-2.5 w-[36rem]  ml-2 mt-5   focus:ring-blue-500 focus:border-blue-500 placeholder-custom-yellow hover:placeholder-custom-white bg-custom-black border mx-5  border-custom-yellow text-custom-white placeholder:text-custom-yellow  text-sm rounded-lg "
                placeholder="Description"
              disabled></textarea>
            </div>

          </div>
          <div className='mt-5 ml-[20.5rem]'>
          <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500  to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 w-[10rem] py-2.5 text-center me-2 mb-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addstock;
