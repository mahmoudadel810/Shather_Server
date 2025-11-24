import { Category } from "../../DB/Models/category.js";
import { Menu } from "../../DB/Models/menu.js";

// add Menu items
export const addMenuItems = async (req, res, next) => {
  const { itemNameEN, itemNameAr, itemPriceEN, itemPriceAR, categoryId } =
    req.body;

  //check category found
  const cateExist = await Category.findById(categoryId);
  if (!cateExist)
    return next(
      new Error("category not found chose anther category ", { cause: 404 })
    );

  //create menuItem object

  const itemObject = {
    itemNameEN,
    itemNameAr,
    itemPriceEN,
    itemPriceAR,
    categoryId,
  };

  //create item 

  const NewItem = await Menu.create({itemObject})
  res.status(200).json({
    success:true,
    masseg:"item create success",
    data :NewItem
  })
};


//get all Menu item 

export const getAllItems= async (req,res,next)=>{
    const allItems = await Menu.find()

    if(allItems.length == 0) return res.status(201).json({
        masseg:"items ia empty...",
        allItems
    })
     if(!allItems) return next(new Error ("items not found ",{cause:404}))


        res.status(200).json({
            success:true,
            masseg:"items success",
            data:allItems
        })
}


// update item in menu

export const updateItems=async (req,res,next)=>{
   const {itemNameEN,
    itemNameAr,
    itemPriceEN,
    itemPriceAR,
    categoryId} = req.body

    const {itemId} = req.params

    //check categ found
    const cateExist = await Category.findById(categoryId);
  if (!cateExist)
    return next(
      new Error("category not found chose anther category ", { cause: 404 })
    );

    //check itemId 
    const itemExist = await Menu.findById(itemId);
  if (!itemExist)
    return next(
      new Error("items not found ", { cause: 404 })
    );
 

    const itemUpdaterObject = {
        itemNameAr,
    itemPriceEN,
    itemPriceAR,
    categoryId
    }

    const updateItem = await Menu.findByIdAndUpdate({_id:itemId},{new:true})
    res.status(200).json({
        success:true,
        masseg:"item update true",
        data:updateItem
    })
}