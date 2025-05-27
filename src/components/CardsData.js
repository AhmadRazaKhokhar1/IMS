import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BsClipboard2Data } from "react-icons/bs";

export const CardsData =[
    {
       title : "Sales",
       color :{
        backGround : "white",
        boxShadow : "0px 10px 20px 0px #d1d1eb",
       },
       barValue : 70,
       value :"30,100",
       icon : RiMoneyDollarBoxLine,
       series : [
        {
            name : "Sales",
            data : [31 , 40 , 28 , 51 , 42, 109, 100]
        },
       ],
    },
    {
       title : "Revenues",
       color :{
        backGround : "white",
        boxShadow : "0px 10px 20px 0px #d1d1eb",
       },
       barValue : 80,
       value :"45,000",
       icon : BiMoneyWithdraw,
       series : [
        {
            name : "Revenue",
            data : [13 , 46 , 82 , 34 , 65, 129, 100]
        },
       ],
    },
    {
       title : "Expenses",
       color :{
        backGround : "white",
        boxShadow : "0px 10px 20px 0px #d1d1eb ",
       },
       barValue : 60,
       value :"4,270",
       icon : BsClipboard2Data,
       series : [
        {
            name : "Expenses",
            data : [13 , 17 , 25 , 34 , 15, 12, 10]
        },
       ],
    },
]