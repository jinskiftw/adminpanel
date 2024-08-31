import {
    Button,
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Modal,
 
    Table,
    Container,
    Row,
    FormGroup,
 
    Col,
    Label, 
 
  } from "reactstrap";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { getAllBlogs,deleteBlog,addBlog,updateBlog} from "../../redux/action/blog"
  import { handleApiCall } from '../../utils/apiUtils'
  import { Formik, Form, Field, ErrorMessage } from 'formik';
  import * as Yup from 'yup';
  import config from '../../config';
  import { useLocation } from "react-router-dom";
  import useSortableTable from "utils/sortableTable";
  import { render } from 'react-dom';

  import { WithContext as ReactTags } from 'react-tag-input';
  import { CKEditor } from '@ckeditor/ckeditor5-react';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import { confirmAlert } from 'react-confirm-alert'; // Import

  const BlogManagement = () => {
    const location=useLocation() ; 
    const [open, setOpen] = useState(false)
    const [editFlag, setEditFlag] = useState(false)
    const [editCatId, setEditCatId] = useState("")
    const [editBlogData, setEditBlogData] = useState("")
    const dispatch = useDispatch();
    const allBlogData = useSelector((state) =>state?.blog?.allBlogData?.data);
  
    const {sorting,SortableHeader}=   useSortableTable();
    
  const queryParams = new URLSearchParams(location.search);
 
  const initialSearchKey = queryParams.get('search') || '';

  const [searchKey, setSearchKey] = useState(initialSearchKey);
 
  useEffect(() => {
    setSearchKey(initialSearchKey); 
    
   
  }, [initialSearchKey]);


  const [tags, setTags] = useState([]);

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };




    useEffect(() => {
   
      dispatch(getAllBlogs(searchKey,sorting));
     
    }, [searchKey,sorting]);
  
  
    const handleBlogDelete = async (id) => {
      try {
        const success = await handleApiCall(dispatch, deleteBlog(id));
        if (success) {
          dispatch(getAllBlogs(searchKey));
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const newBlogAdd = async (value) => {
      try {
        console.log("Add values are ",value);
        const success = await handleApiCall(dispatch, addBlog(value));
        if (success) {
          setOpen(false)
          dispatch(getAllBlogs(searchKey));
        }
  
      } catch (error) {
        console.log(error);
      }
    };
   
    const validationSchema = Yup.object().shape({
      title: Yup.string().required("Title Required").min(4, 'Too Short!').max(25, 'Too Long!')
 
    });
  
    const handleCheckboxChange = async (id, status) => {
      const updateStatus = {
        isActive: !status
      }
      try {
        const success = await handleApiCall(dispatch, updateCategoryStatus(id, updateStatus));
        if (success) {
          setOpen(false)
          dispatch(getAllCategories());
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    const handleBlogEdit = async(id) =>{
      setOpen(true);
      setEditFlag(true);
      const blogData = allBlogData.filter((item)=>item._id==id)[0];
      //console.log(blogData);
      // Set the initial values for the form fields based on blogData
      const initialValues = {
        title: blogData.title || "",
        description:blogData.description,
        tags:blogData.tags || [],
      };
      //console.log(initialValues)
      setEditCatId(blogData._id);
      setEditBlogData(initialValues);
    }
  
    const updateBlogData = async (id,value) => {console.log(id,value)
      try {
        const success = await handleApiCall(dispatch, updateBlog(id,value));
        if (success) {
          setOpen(false)
          dispatch(getAllBlogs());
        }
  
      } catch (error) {
        console.log(error);
      }
    };
   
      const TagInputField = () => {
 
   
        const handleDelete = (index) => {
          setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
        };
      
        const handleAddition = (tag) => {
          setTags([...tags, tag]);
        };
      
        return (
          <div>
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              placeholder="Enter tags..."
              classNames={{
                tag: 'react-tag-input__tag',
                suggestions: 'react-tag-input__suggestions',
                suggestionItem: 'react-tag-input__suggestionItem',
                remove: 'react-tag-input__remove',
              }}
            />
          </div>
        );
      };
      
    return (
      <>
        <UserHeader />
        <Container className="mt--8" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Blog Management</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={() =>{ setOpen(!open); setEditFlag(false);}}
                        size="sm"
                      >
                        Add New Blog
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Modal className="modal-dialog-centered" isOpen={open}>
                  <div className="modal-header bg-secondary">
                    <h3 className="modal-title" id="exampleModalLabel">
                    {editFlag? 'Edit Blog':'Add New Blog'}
                    </h3>
                    <button
                      aria-label="Close"
                      className="close"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => setOpen(false)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <div className="modal-body bg-secondary">
                  <Formik
                      initialValues={editFlag? editBlogData:{ title: "", description: "" }}
                      validationSchema={validationSchema}
                      onSubmit={async (values, { setSubmitting }) => {
                
                        values={...values,tags:tags.map(item=>(item.text))} ;
                         
                        try {
                          
                          if(editFlag){
                            await updateBlogData(editCatId,values);
                          }else{
                            await newBlogAdd(values);
                          }
                          
                          
                        } catch (error) {
                          console.error('Error submitting form:', error);
                        } finally {
                          setSubmitting(false);
                        }
                      }}
                    >   
                      {({ values,setFieldValue }) => (
                        <Form role="form">
                          <FormGroup row className="mb-3">
                            <Label for="title" sm={3}>
                              Title
                            </Label>
                            <Col sm={9}>
                              <Field
                                type="text"
                                name="title"
                                placeholder="Title"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="title"
                                component="div"
                                className="text-danger"
                              />
                            </Col>
                          </FormGroup>
  
  
  
                          <FormGroup row className="mb-3">
                            <Label for="description" sm={3}>
                              Description
                            </Label>
                            <Col sm={9}>
                            <CKEditor
      editor={ClassicEditor} // Optional: Use a different pre-built editor
      data="" // Initial content (optional)
      onChange={(event, editor) => {
        const data = editor.getData();
        setFieldValue('description', data);
      }}
      onReady={(editor) => {
        // Optional: Handle CKEditor events (e.g., focus, blur, change)
      }}
      onBlur={(event, editor) => {
        // Update form state on blur
        const content = editor.getData();
        // Access formik using context or other mechanisms here
        // onChange(content); // Update formik state (replace with your approach)
      }}
    />
                            </Col>
                          </FormGroup>


                          
                          <FormGroup row className="mb-3">
                            <Label for="description" sm={3}>
                              Tags
                            </Label>
                            <Col sm={9}>
                            <Field
            name="tags"
            
            component={TagInputField}
            placeholder="Enter tags..."
            classNames={{
              tags: 'react-tags__tags',
              tagInput: 'react-tags__tag-input',
              tag: 'react-tags__tag',
              remove: 'react-tags__remove'
            }}
          />
                              <ErrorMessage
                                name="color"
                                component="div"
                                className="text-danger"
                              />
                            </Col>
                          </FormGroup>



                         
 
 





  
  
                
  
                          <div className="text-center">
                            <Button className="my-4" color="primary" type="submit">
                              Submit
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Modal>
  
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
           
                              
                    <SortableHeader columnKey="title">
                    Title
                     </SortableHeader>
                      <th scope="col">description</th>
                 
                      {/*<th scope="col">Options</th>*/}
        

                                     
                    <SortableHeader columnKey="type">
                    Type
                     </SortableHeader>
                     <SortableHeader columnKey="price">
                    Price
                     </SortableHeader>
                     
                      <SortableHeader columnKey="isRecurring">
                      Is Recurring?
                     </SortableHeader>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {allBlogData!=undefined && allBlogData.length > 0 &&
                      allBlogData?.map((blog) => (
                        <tr key={blog._id}>
                          <th scope="row">{blog.title}</th>
                          <td>{blog.description}</td>
                          <td>{blog.tags} </td>
                          <td>{blog.price} </td>
                     
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                  href="#pablo"
                                  onClick={() => handleBlogEdit(blog._id)}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={() => handleBlogDelete(blog._id)}
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                 
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
  
  export default BlogManagement;
  