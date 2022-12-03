import { useEffect, useState } from "react";
import "./App.css";
import Directory from "./Components/Directory/Directory";
import WorkArea from "./Components/WorkArea/WorkArea";
import { Main, Navbar } from "./Styles/General.styled";
import "./App.css";
import ItemManager from "./contracts/ItemManager.json";
import Item from "./contracts/Item.json";
import getWeb3 from "./getWeb3";
import { supabase } from "./supabaseClient";

const App = () => {
  const [database, setDatabase] = useState();
  const [runQuery, setRunQuery] = useState("");
  const [itemMan, setItemMan] = useState();
  const [accounts, setAccounts] = useState();
  const [loaded, setLoaded] = useState(false);
  const [pending, setPending] = useState("No Pending Action");
  const [status, setStatus] = useState([
    { name: "Created", keys: [], records: 0 },
    { name: "Sold", keys: [], records: 0 },
    { name: "Delivered", keys: [], records: 0 },
  ]);

  useEffect(() => {
    if (itemMan != undefined) {
      listenToPaymentEvent();
    }
  }, [itemMan]);

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const { error, data } = await supabase
          .from("Status") //the table you want to work with
          .select("name, status, id, time") //columns to select from the database
          .order("time", { ascending: false }); // sort the data so the last item comes on top;
        console.log(data);
        const newData = [
          { name: "Created", keys: [], records: 0 },
          { name: "Sold", keys: [], records: 0 },
          { name: "Delivered", keys: [], records: 0 },
        ];
        for (let i = 0; i < data.length; i++) {
          if (data[i].status == "created") {
            newData[0].keys.push(data[i]);
          } else if (data[i].status == "sold") {
            newData[1].keys.push(data[i]);
          } else if (data[i].status == "delivered") {
            newData[2].keys.push(data[i]);
          }
        }
        for (let i = 0; i < 3; i++) newData[i].records = newData[i].keys.length;
        setStatus(newData);
        console.log(newData, data);
      } catch (error) {
        console.error(error);
      }
    };
    asyncFunction();
  }, []);

  const handlePaid = async (index) => {
    try {
      const { error } = await supabase
        .from("Status")
        .update({ status: "sold" })
        .eq("id", index);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeliver = async (index) => {
    try {
      let result = await itemMan.methods
        .triggerDelivery(index)
        .send({ from: accounts[0] });
      console.log(result);
      const { error } = await supabase
        .from("Status")
        .update({ status: "delivered" })
        .eq("id", index);
      const deliverItem = status[1].keys.filter((el) => el.id == index);
      deliverItem.status = "delivered";
      const updatedSoldKeys = status[1].keys.filter((el) => el.id != index);
      const updatedStatus = [
        {
          name: "Created",
          keys: [...status[0].keys],
          records: status[0].keys.length,
        },
        {
          name: "Sold",
          keys: updatedSoldKeys,
          records: updatedSoldKeys.length,
        },
        {
          name: "Delivered",
          keys: [...status[2].keys, ...deliverItem],
          records: status[2].keys.length + 1,
        },
      ];
      console.log(updatedStatus);
      setStatus(updatedStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (name, price) => {
    try {
      let result = await itemMan.methods
        .createItem(name, price)
        .send({ from: accounts[0] });

      const id = result.events.SupplyChainStep.returnValues._itemIndex;
      const newItem = {
        name,
        time: Date().now,
        id,
        status: "created",
        price,
      };

      await supabase.from("Status").insert(newItem);
      const updatedCreateStatusKeys = [...status[0].keys, newItem];
      const updatedStatus = status.map((el) =>
        el.name == "Created"
          ? {
              ...el,
              keys: updatedCreateStatusKeys,
            }
          : el
      );
      updatedStatus[0].records = updatedStatus[0].keys.length;
      console.log(updatedStatus);
      setStatus(updatedStatus);
      alert(
        "Send " +
          price +
          " Wei to " +
          result.events.SupplyChainStep.returnValues._address +
          " with Item index:" +
          result.events.SupplyChainStep.returnValues._itemIndex
      );
      setPending(
        "Pending payment of " +
          price +
          " Wei to " +
          result.events.SupplyChainStep.returnValues._address +
          " with Item index: " +
          result.events.SupplyChainStep.returnValues._itemIndex
      );
    } catch (error) {
      console.error(error);
    }
  };

  const listenToPaymentEvent = () => {
    if (itemMan == undefined) return;
    itemMan.events.SupplyChainStep().on("data", async function (evt) {
      if (evt.returnValues._step == 1) {
        let item = await itemMan.methods
          .items(evt.returnValues._itemIndex)
          .call();
        console.log(item);
        // const { error } = await supabase
        //   .from("Status")
        //   .update({ status: "sold" })
        //   .eq("id", item._itemIndex);
        console.log(item);
        console.log("alert1");
        alert("Item " + item._identifier + " was paid, deliver it now!");
        setPending("Deliver item " + item._identifier + " to it's buyer now!");
      }
      if (evt.returnValues._step == 2) {
        let item = await itemMan.methods
          .items(evt.returnValues._itemIndex)
          .call();
        console.log(item);
        console.log("alert2");
        alert(
          "Item " +
            item._identifier +
            " was delivered, ask for reviews from user."
        );
      }
      //console.log("Item was paid, deliver it now!");
      // console.log(evt);
      // console.log("alert2");
    });
  };

  useEffect(() => {
    const InitFunction = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        let accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const itemManager = new web3.eth.Contract(
          ItemManager.abi,
          ItemManager.networks[networkId] &&
            ItemManager.networks[networkId].address
        );
        const item = new web3.eth.Contract(
          Item.abi,
          Item.networks[networkId] && Item.networks[networkId].address
        );
        setItemMan(itemManager);
        setAccounts(accounts);
        listenToPaymentEvent();
        // this.handleSubmit2();
        setLoaded(true);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    InitFunction();
  }, []);

  let overviewData = [];
  //   for (const table in data) {
  //     overviewData.push({
  //       name: table,
  //       keys: Object.keys(data[table][0]),
  //       records: data[table].length,
  //     });
  //   }
  if (!loaded) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div>
      <Navbar>SUPPLY CHAIN MANAGEMENT BLOCKCHAIN D-APP</Navbar>
      <marquee>{pending}</marquee>
      <Main>
        <Directory
          status={status}
          overviewData={overviewData}
          setRunQuery={setRunQuery}
        ></Directory>
        <WorkArea
          functions={{ handleCreate, handleDeliver, handlePaid }}
          database={database}
          setRunQuery={setRunQuery}
          runQuery={runQuery}
        ></WorkArea>
      </Main>
    </div>
  );
};

export default App;

// class App extends Component {
//   state = { cost: 0, itemName: "exampleItem1", loaded: false, index: 0 };

//   // componentDidMount = async () => {
//   //   try {
//   //     // Get network provider and web3 instance.
//   //     this.web3 = await getWeb3();

//   //     // Use web3 to get the user's accounts.
//   //     this.accounts = await this.web3.eth.getAccounts();

//   //     // Get the contract instance.
//   //     const networkId = await this.web3.eth.net.getId();
//   //     this.itemManager = new this.web3.eth.Contract(
//   //       ItemManager.abi,
//   //       ItemManager.networks[networkId] &&
//   //         ItemManager.networks[networkId].address
//   //     );
//   //     this.item = new this.web3.eth.Contract(
//   //       Item.abi,
//   //       Item.networks[networkId] && Item.networks[networkId].address
//   //     );
//   //     this.listenToPaymentEvent();
//   //     // this.handleSubmit2();
//   //     this.setState({ loaded: true });
//   //   } catch (error) {
//   //     // Catch any errors for any of the above operations.
//   //     alert(
//   //       `Failed to load web3, accounts, or contract. Check console for details.`
//   //     );
//   //     console.error(error);
//   //   }
//   // };

//   handleSubmit = async () => {
//     const { cost, itemName } = this.state;
//     console.log(itemName, cost, this.itemManager);
//     let result = await this.itemManager.methods
//       .createItem(itemName, cost)
//       .send({ from: this.accounts[0] });
//     console.log(result);
//     alert(
//       "Send " +
//         cost +
//         " Wei to " +
//         result.events.SupplyChainStep.returnValues._address +
//         " with Item index:" +
//         result.events.SupplyChainStep.returnValues._itemIndex
//     );
//   };

//   handleSubmit2 = async () => {
//     const { index } = this.state;

//     let result = await this.itemManager.methods
//       .triggerDelivery(index)
//       .send({ from: this.accounts[0] });
//     console.log(result);
//   };

//   handleInputChange = (event) => {
//     const target = event.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     const name = target.name;
//     this.setState({
//       [name]: value,
//     });
//   };

//   listenToPaymentEvent = () => {
//     let self = this;
//     this.itemManager.events.SupplyChainStep().on("data", async function (evt) {
//       if (evt.returnValues._step == 1) {
//         let item = await self.itemManager.methods
//           .items(evt.returnValues._itemIndex)
//           .call();
//         console.log(item);
//         console.log("alert1");
//         alert(
//           "Item " +
//             item._identifier +
//             +" with Item index: " +
//             item._itemIndex +
//             " was paid, deliver it now!"
//         );
//       }
//       if (evt.returnValues._step == 2) {
//         let item = await self.itemManager.methods
//           .items(evt.returnValues._itemIndex)
//           .call();
//         console.log(item);
//         console.log("alert2");
//         alert(
//           "Item " +
//             item._identifier +
//             " was delivered, ask for reviews from user "
//         );
//       }
//       //console.log("Item was paid, deliver it now!");
//       // console.log(evt);
//       // console.log("alert2");
//     });
//   };

//   render() {
//     // if (!this.state.loaded) {
//     //   return <div>Loading Web3, accounts, and contract...</div>;
//     // }
//     return (
//       <div className="App">
//         <div className="temp">
//           {" "}
//           <h1>123 D-dg!</h1>{" "}
//         </div>
//         <h2 className="temp2">
//           Add desired Item to sell with it's Cost and Name:
//         </h2>
//         <div className="temp6">
//           Cost of Item:{" "}
//           <input
//             type="text"
//             name="cost"
//             value={this.state.cost}
//             onChange={this.handleInputChange}
//           />
//           Item Name:{" "}
//           <input
//             type="text"
//             name="itemName"
//             className="temp4"
//             value={this.state.itemName}
//             onChange={this.handleInputChange}
//           />
//           <button
//             type="button"
//             className="button-14"
//             onClick={this.handleSubmit}
//           >
//             Create new Item
//           </button>
//         </div>
//         <div className="temp5">
//           <h2 className="temp2">
//             Mark the Item that has been delivered by Entering the Index, VISIT
//             RINKEBY ETHERSCAN FOR MORE:
//           </h2>
//           Delivered Item:{" "}
//           <input
//             type="text"
//             name="index"
//             value={this.state.index}
//             onChange={this.handleInputChange}
//           />
//           <button
//             type="button"
//             className="button-14"
//             onClick={this.handleSubmit2}
//           >
//             Mark Delivered
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
