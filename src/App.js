import React from "react";
import Header from "../src/components/Header/header";
import TableContainer from "../src/components/Table/tableContainer";
import './App.css';
import tableApiData from "../src/store/data.json";
import moment from "moment";
import DatePicker from 'react-date-picker';
import Modal from "../src/components/Modal/Modal"

class App extends React.Component {
constructor(props) {
  super(props);
  this.state ={
    tableDataVal: [],
    activeTab: "upcoming",
    todayDate: new Date(),
    showModal: false,
    imageUrl: null,
    modalName: null 

  }
}

componentDidMount () {
  this.setState({
    tableDataVal: tableApiData.data
  })
}
  

  getTableHeader = () => {
    const columns =[
      {
        "tableHead": "DATE",
        "width": 100
      },
      {
        "tableHead": "CAMPAIGN",
        "width": 200
      },
      {
        "tableHead": "VIEW",
        "width": 300
      },
      {
        "tableHead": "ACTIONS",
        "width": 600
      }
    ]
    return columns;
  }

  setDateVal = (index, val) => {
    const { tableDataVal } = this.state;
    tableDataVal[index].createdOn = val.getTime();
    this.setState({
      ...tableDataVal
    })
  }

  checkToday = (date1, date2) => {
    if(new Date(date1).setHours(0,0,0,0) == date2.setHours(0,0,0,0)) {
      return true;
    } else {
      return false
    }
  }

  checkFutureDate = (date1, date2) => {
    if(new Date(date1).setHours(0,0,0,0) - date2.setHours(0,0,0,0) > 0){
      return true
    } else {
      return false;
    }
  }

  checkPastDate = (date1, date2) => {
    if( new Date(date1).setHours(0,0,0,0) - date2.setHours(0,0,0,0) < 0) {
      return true
    } else {
      return false;
    }
  }

  openModal = (name, url) => {
    if(!this.state.showModal) {
      this.setState({
        showModal: true,
        imageUrl: url,
        modalName: name
      })
    } else {
      this.setState({
        showModal: false
      })
    }
  }

  getTableRow = () => {
    let rowMain = [];
    const { tableDataVal, todayDate, activeTab } = this.state;
    const { setDateVal, checkToday, checkFutureDate, checkPastDate, openModal } = this;
    console.log(tableDataVal, "value in row")
    tableDataVal && tableDataVal.length && tableDataVal.map((val, index) => {
      //console.log(moment(val.createdOn).format("MMMYYYY,DD"));
      //console.log(val.createdOn , "hiii")
      const rowData = [];

      switch(activeTab) {
        case "upcoming": {
          if(checkFutureDate(val.createdOn, todayDate)) {
              rowData.push(
                {
                  "rowValue": <span><span className="block">{moment(val.createdOn).format("MMMYYYY,DD")}</span>{moment(val.createdOn).fromNow()}</span>
                },
                {
                  "rowValue": <span>{val.name}{val.region}</span>
                },
                {
                  "rowValue": <span>view price</span>
                },
                {
                  "rowValue": <span><a href={val.csv} target="_blank">csv</a><a href={val.report}>Report</a><a><DatePicker clearIcon={null} onChange={setDateVal.bind(null, index)}/></a></span>
                }
              )
              rowMain.push({ rowData })
          }
          
        }
       
        break;
        case "live": {
          if(checkToday(val.createdOn ,todayDate)) {
            rowData.push(
              {
                "rowValue": <span><span className="block">{moment(val.createdOn).format("MMMYYYY,DD")}</span>{moment(val.createdOn).fromNow()}</span>
              },
              {
                "rowValue": <span>{val.name}{val.region}</span>
              },
              {
                "rowValue": <span>view price</span>
              },
              {
                "rowValue": <span><a href={val.csv} target="_blank">csv</a><a href={val.report}>Report</a><a><DatePicker clearIcon={null} onChange={setDateVal.bind(null, index)}/></a></span>
              }
            )
            rowMain.push({ rowData })
        }
        
        }
        
        break;
        case "past": {
          if(checkPastDate(val.createdOn, todayDate)) {
            rowData.push(
              {
                "rowValue": <span><span className="block">{moment(val.createdOn).format("MMMYYYY,DD")}</span>{moment(val.createdOn).fromNow()}</span>
              },
              {
                "rowValue": <span>{val.name}{val.region}</span>
              },
              {
                "rowValue": <span className="price-btn" onClick={openModal.bind(this, val.name, val.image_url, val.price)}>view price</span>
              },
              {
                "rowValue": <span><a href={val.csv} target="_blank">csv</a><a href={val.report}>Report</a><a><DatePicker clearIcon={null} onChange={setDateVal.bind(null, index)}/></a></span>
              }
            )
        }
        rowMain.push({ rowData })
        }
        break;
      }
    })
    return rowMain;
  }

  setTabValue = (value) => {
    this.setState({
      activeTab: value
    })
  }



  render() {
    const { tableDataVal, activeTab, showModal, modalName, imageUrl } = this.state;
    const { setTabValue } = this;
    const tableData = {
      viewPortColums: 4,
      tableHead: tableDataVal && tableDataVal.length && this.getTableHeader(),
      tableRow: tableDataVal && tableDataVal.length && this.getTableRow()
    }
    console.log(this.state.todayDate)

    return (  
      <div className="App">
        <Header
          imageSrc="https://cdn-www.bluestacks.com/bs-images/bs-logo-new.png"
        />
        <div className="table-wrap">
          <h1>Manage campaigns</h1>
          <ul className="nav-tab">
            <li onClick={setTabValue.bind(this, "upcoming")} className={activeTab == "upcoming" ? "active" : ""}>
              Upcoming campaign
            </li>
            <li onClick={setTabValue.bind(this, "live")} className={activeTab == "live" ? "active" : ""}>
              Live campaign
            </li>
            <li onClick={setTabValue.bind(this, "past")} className={activeTab == "past" ? "active" : ""}>
              Past campaign
            </li>

          </ul>
         {tableDataVal && tableDataVal.length ? <TableContainer
            tabledata={tableData}
         /> : ""}
         {showModal && <Modal heading="Dasboard popup" onClose={this.openModal}>
           <div>
             <div className="image-wrap"><img src={imageUrl}/><span>{modalName}</span></div>
              <ul className="price-list">
                <li><span>1 week- 1month</span> <span>$100</span></li>
                <li><span>6 month</span> <spa>$500</spa></li>
                <li><span>1 year</span> <span>$900</span></li>
              </ul>
            </div>
           </Modal>}
        </div>
      </div>
    );
  } 
}

export default App;
