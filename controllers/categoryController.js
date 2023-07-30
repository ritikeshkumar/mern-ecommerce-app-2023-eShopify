import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

//create category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(401).send({ message: "Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Category Created",
      category,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params; //id will get from url

    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Category",
    });
  }
};

//get all category
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(201).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Categories",
    });
  }
};

//get single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({ slug: req.params.slug });
    res.status(201).send({
      success: true,
      message: "Get Single Category successfully",
      category,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single Categories",
    });
  }
};

//delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params; //that is from url
    await categoryModel.findByIdAndDelete(id);
    res.status(201).send({
      success: true,
      message: "Category Deleted successfully",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting Category",
    });
  }
};
