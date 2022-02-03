import React , {Component} from 'react'

class Submit extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <>
        <form className="max-w-screen-sm w-11/12 mx-auto shadow-lg rounded-lg my-6 p-4">
            <input className="w-11/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border placeholder-gray-500" placeholder="Coin Name" type="text" />
            <input className="w-11/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border placeholder-gray-500" placeholder="Symbol" type="text" />
            <input className="w-11/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border placeholder-gray-500" placeholder="Logo URL" type="url" />
            <textarea className="w-11/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border placeholder-gray-500" cols="40" rows="6" placeholder="Description of your coin..."></textarea>
            <input className="w-11/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border placeholder-gray-500" placeholder="Address" type="text" />
            <input className="w-11/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border placeholder-gray-500" placeholder="Website URL" type="url" />
            <select className="w-11/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border text-gray-500">
              <option>Select Block Chain type</option>
              <option>Ethereum</option>
              <option>Binance Smart Chain</option>
              <option>Matic</option>
              <option>Bitcoin</option>
            </select>
            <input className="w-11/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border placeholder-gray-500" type="date" />
            <input className="w-11/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border placeholder-gray-500" placeholder="Market Capital" type="number" />
            <input className="w-11/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border placeholder-gray-500" placeholder="Twitter link" type="url" />
            <input className="w-11/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border placeholder-gray-500" placeholder="Telegram link" type="url" />
            <button className="w-6/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border">Submit</button>
        </form>
      </>
    )
  }
}

export default Submit;