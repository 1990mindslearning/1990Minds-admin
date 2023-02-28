import { DatePicker, Form,Input, InputNumber, Select,Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { useEffect } from "react";
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import project, { projectSelector } from "../../../../api/project";



export default function ProjectformEdit({info,actionMethod,data}){
    
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const {project_data} = useSelector(projectSelector)
    const [month, setMonth] = useState(false)

    const onFinishProjectForm = (values)=>{
        console.log(values.start_date)

        // const data = {

        //     pn:
        //     social_media: tab1.service_type==='social_media' ? tab2 :null
        //     package_design: tab1.service_type==='package_design' ? tab2 :null
        //     catalogue:
        //     brochure:
        //  }


        const startdate = moment(values.start_date).format();
        values.start_date= startdate;
        console.log(values.start_date)
        const projectData=values;
        console.log(projectData);
        dispatch(actionMethod())
        dispatch(info(projectData))




        // const projectFormData = {
        //     project_name: values.project_name,
        // project_data?.service_type === 'Social media post'?
            

        // }


    }
    const setMonthlyTarget = (value)=>{
        console.log(value)
        setMonth(true)
    }

    useEffect(()=>{
        form.setFieldsValue({
            service_type:project_data?.service_type,
            project_name:project_data?.project_name,
            start_date:moment(data?.start_date),
            duration:data?.logo?.duration,
            design_detail:data?.logo?.design_detail,
            description:data?.logo?.description,
            logo_type:data?.logo?.logo_type,
            tag_line:data?.logo?.tag_line,
            color_scheme:data?.logo?.color_scheme,
            purpose:data?.logo?.purpose,
            additional_requirement:data?.logo?.additional_requirement,


            b_duration:data?.brochure?.b_duration,
            brochure_details:data?.brochure?.brochure_details,
            no_of_pages:data?.brochure?.no_of_pages,
            brochure_color:data?.brochure?.brochure_color,
            brochure_size:data?.brochure?.brochure_size,
            brochure_purpose:data?.brochure?.brochure_purpose,
            brochure_additional_requirement:data?.brochure?.brochure_additional_requirement,

            b_duration:data?.flyer?.b_duration,
            brochure_details:data?.flyer?.brochure_details,
            no_of_pages:data?.flyer?.no_of_pages,
            brochure_color:data?.flyer?.brochure_color,
            brochure_size:data?.flyer?.brochure_size,
            brochure_purpose:data?.flyer?.brochure_purpose,
            brochure_additional_requirement:data?.flyer?.brochure_additional_requirement,

            c_duration:data?.catalogue?.c_duration,
            catalogue_details:data?.catalogue?.catalogue_details,
            no_of_products:data?.catalogue?.no_of_products,
            catalogue_color:data?.catalogue?.catalogue_color,
            catalogue_size:data?.catalogue?.catalogue_size,
            catalogue_purpose:data?.catalogue?.catalogue_purpose,
            catalogue_additional_requirement:data?.catalogue?.catalogue_additional_requirement,

            pd_duration:data?.package_design?.pd_duration,
            package_details:data?.package_design?.package_details,
            package_size:data?.package_design?.package_size,
            package_type:data?.package_design?.package_type,
            package_purpose:data?.package_design?.package_purpose,
            package_content:data?.package_design?.package_content,
            package_additional_requirement:data?.package_design?.package_additional_requirement,

            media:data?.social_media?.media,
            periodic:data?.social_media?.periodic,


            website_type:data?.website?.website_type,
            need_hosting:data?.website?.need_hosting,
            website_color:data?.website?.website_color,
            budget:data?.website?.budget,
            website_address:data?.website?.website_address,
            website_pages:data?.website?.website_pages,
            target_audience:data?.website?.target_audience,
            additional_web_requirement:data?.website?.additional_web_requirement,
            comments:data?.website?.comments,

           




        })
    })
    return(
        <div>
        <Form onFinish={onFinishProjectForm}
              name = "project form"
              form={form}
              labelCol={{span:24}}
              wrapperCol={{span:24}}
              initialValues= {{remember:true}}>
              <div>
              <div className=" grid grid-cols-2 gap-4">
            

              
      
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Project Name</p>}
                name = "project_name"
                >
                <Input disabled/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Service Type</p>}
                name="service_type">

               <Input disabled/>
            </Form.Item>
            </div>
{
    project_data?.service_type === 'Logo'?
    <div >
            <div className=" grid grid-cols-2 gap-3">
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Start Date</p>}
                name = "start_date"
                rules = {[{required:true,message:'required'}]}>
                <DatePicker picker = 'date'/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Duration</p>}
                name = "duration"
                rules = {[{required:true,message:'required'}]}>
                <InputNumber placeholder="duration is number of months/days"/>
            </Form.Item>

            <Form.Item
                label ={<p className=" text-left m-0 w-32">Design Details</p>}
                name = "design_detail"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Enter the design details"/>
            </Form.Item>
           
            
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Description</p>}
                name = "description"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Enter the descriptions...."/>
            </Form.Item>

            <Form.Item
                label ={<p className=" text-left m-0 w-32">Logo Type</p>}
                name = "logo_type"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="Logo Type"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Tag Line</p>}
                name = "tag_line"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="Tag Line"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Color Scheme</p>}
                name = "color_scheme"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="color Scheme"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Purpose</p>}
                name = "purpose"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="Purpose"/>
            </Form.Item>

            <Form.Item
                label ={<p className=" text-left m-0 w-50">Additional Requirement</p>}
                name = "additional_requirement"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Additional requirement asked for..,"/>
            </Form.Item>
            
            </div>
            </div>:project_data?.service_type === 'Brochure' || project_data?.service_type === 'Flyer' ?
            <div className="">
            <div className=" grid grid-cols-2 gap-3">
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Start Date</p>}
                name = "start_date"
                rules = {[{required:true,message:'required'}]}>
                <DatePicker picker = 'date'/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Duration</p>}
                name = "b_duration"
                rules = {[{required:true,message:'required'}]}>
                <InputNumber placeholder="duration is number of months/days"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Brochure Details</p>}
                name = "brochure_details"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Enter the design details"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">No of Pages</p>}
                name = "no_of_pages"
                rules = {[{required:true,message:'required'}]}>
                <Select placeholder="Select the no of pages">
                    <option key = "1" value = "Bifold">Bifold</option>
                    <option key = "2" value = "Trifold">Trifold</option>
                </Select>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Color Scheme</p>}
                name = "brochure_color"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder = "color scheme"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Size</p>}
                name = "brochure_size"
                rules = {[{required:true,message:'required'}]}>
                <Select placeholder="Select the no of pages">
                    <option key = "1" value = "A4">A4</option>
                    <option key = "2" value = "A5">A5</option>
                </Select>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Purpose</p>}
                name = "brochure_purpose"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="Purpose"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Additional Requirement</p>}
                name = "brochure_additional_requirement"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Additional requirement asked for..,"/>
            </Form.Item>

            </div>
            </div>:project_data?.service_type === 'Catalogue'?
            <div className="">
            <div className=" grid grid-cols-2 gap-3">
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Start Date</p>}
                name = "start_date"
                rules = {[{required:true,message:'required'}]}>
                <DatePicker picker = 'date'/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Duration</p>}
                name = "c_duration"
                rules = {[{required:true,message:'required'}]}>
                <InputNumber placeholder="duration is number of months/days"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Brochure Details</p>}
                name = "catalogue_details"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Enter the design details"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">No of Products</p>}
                name = "no_of_products"
                rules = {[{required:true,message:'required'}]}>
                <Select placeholder="Select the no of pages">
                    <option key = "1" value = "Bifold">Bifold</option>
                    <option key = "2" value = "Trifold">Trifold</option>
                </Select>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Color Scheme</p>}
                name = "catalogue_color"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder = "color scheme"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Size</p>}
                name = "catalogue_size"
                rules = {[{required:true,message:'required'}]}>
                <Select placeholder="Select the no of pages">
                    <option key = "1" value = "A4">A4</option>
                    <option key = "2" value = "A5">A5</option>
                </Select>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Purpose</p>}
                name = "catalogue_purpose"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="Purpose"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Additional Requirement</p>}
                name = "catalogue_additional_requirement"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Additional requirement asked for..,"/>
            </Form.Item></div></div>:project_data?.service_type === 'Package Design'?

            <div className="">
            <div className=" grid grid-cols-2 gap-3">
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Start Date</p>}
                name = "start_date"
                rules = {[{required:true,message:'required'}]}>
                <DatePicker picker = 'date'/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Duration</p>}
                name = "pd_duration"
                rules = {[{required:true,message:'required'}]}>
                <InputNumber placeholder="duration is number of months/days"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Package Details</p>}
                name = "package_details"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Enter the design details"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Package Type</p>}
                name = "package_type"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Enter the Package Type asked for"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Size</p>}
                name = "package_size"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="package size"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Purpose</p>}
                name = "package_purpose"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="Package purpose"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Package Content</p>}
                name = "package_content"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Package Content..,"/>
            </Form.Item>

            <Form.Item
                label ={<p className=" text-left m-0 w-50">Additional Requirement</p>}
                name = "package_additional_requirement"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Additional requirement asked for..,"/>
            </Form.Item></div></div>:project_data?.service_type === 'Social media post'?
            <div className="">
            <div className=" grid grid-cols-2 gap-3">
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Start Date</p>}
                name = "start_date"
                rules = {[{required:true,message:'required'}]}>
                <DatePicker picker = 'date'/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Media Type</p>}
                name = "media"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="Social Media for which designed for..,"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-50">Periodic</p>}
                 
                rules = {[{required:true,message:'required'}]}>
                <Select placeholder="Select the frequency to post" onChange={setMonthlyTarget}>
                    <option key = "1" value="Monthly">Monthly</option>
                </Select>
            </Form.Item>
            {
                month?<Form.Item
                            label ={<p className=" text-left m-0 w-50">Number of Post per Month</p>}
                            name = "periodic"
                            rules = {[{required:true,message:'required'}]}>
                <InputNumber placeholder="Numer of posts per month..,"/>
                </Form.Item>:""
            }
            
            </div></div>:project_data?.service_type === 'Website'?
            <div className=' grid grid-cols-2 gap-3'>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Website Type</p>}
                name = "website_type"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="Website type"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Need Hosting</p>}
                name = "need_hosting"
                rules = {[{required:true,message:'required'}]}>
                <Select placeholder="Need Hosting?">
                    <option key ={"1"} value="Yes">Yes</option>
                    <option key ={"2"} value ="No">No</option>
                </Select> 
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Color Scheme</p>}
                name = "website_color"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="Website colour"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-32">Budget</p>}
                name = "budget"
                rules = {[{required:true,message:'required'}]}>
                <InputNumber placeholder="Budget"/>
            </Form.Item>
            <Form.Item
               name="website_address"
               label="URL"
               rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}>
             <Input placeholder="Eg.., https://google.com" />
      </Form.Item>
      <Form.Item
                label ={<p className=" text-left m-0 w-42">Website Pages/Section</p>}
                name = "website_pages"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="Website sections or pages built"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-42">Target Audience</p>}
                name = "target_audience"
                rules = {[{required:true,message:'required'}]}>
                <Input placeholder="Target Audience"/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-42">Additional Requirements</p>}
                name = "additional_web_requirement"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Addition requirements asked for.."/>
            </Form.Item>
            <Form.Item
                label ={<p className=" text-left m-0 w-42">Comments</p>}
                name = "comments"
                rules = {[{required:true,message:'required'}]}>
                <TextArea placeholder="Any Comments"/>
            </Form.Item>
            </div>:""


            
}
 
<Form.Item wrapperCol={{ span: 20, offset: 9}}>
          <Button type="primary" htmlType="submit">
           Next
          </Button>
        </Form.Item>
        </div>
        </Form>
        </div>
    )
}