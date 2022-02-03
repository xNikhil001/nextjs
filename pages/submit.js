import React , {Component} from 'react'

class Submit extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <>
        <h3 className="max-w-screen-sm w-11/12 mx-auto mt-8 text-2xl mb-2">Submit your coin</h3>
        <form className="max-w-screen-sm w-11/12 mx-auto shadow-lg rounded-lg mb-6 p-4">
            <input className="input" placeholder="Coin Name" type="text" />
            <input className="input" placeholder="Symbol" type="text" />
            <input className="input" placeholder="Logo URL" type="url" />
            <textarea className="input" cols="40" rows="6" placeholder="Description of your coin..."></textarea>
            <input className="input" placeholder="Address" type="text" />
            <input className="input" placeholder="Website URL" type="url" />
            <select className="w-11/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border text-gray-500 hover:bg-gray-300">
              <option>Select Block Chain type</option>
              <option>Ethereum</option>
              <option>Binance Smart Chain</option>
              <option>Matic</option>
              <option>Bitcoin</option>
            </select>
            <input className="input" type="date" />
            <input className="input" placeholder="Market Capital" type="number" />
            <input className="input" placeholder="Twitter link" type="url" />
            <input className="input" placeholder="Telegram link" type="url" />
            <button className="w-6/12 bg-gray-200 mx-auto block p-2 my-6 rounded-md border hover:bg-gray-400 hover:text-gray-100">Submit</button>
        </form>
      </>
    )
  }
}

export default Submit;