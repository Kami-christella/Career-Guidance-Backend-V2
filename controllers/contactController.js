import Contact from "../models/contactModal.js"

export const createContact=async(req, res)=>{

    try{
       const {names,email,message,phone, status}=req.body;
       const newContact=new Contact({names,email,message,phone,status});

       await newContact.save();

       res.status(201).json({success:true, message: "Contact created successfully",Contact: newContact});


    } catch(error){
       res.status(500).json({ success: false, message: "server Error", error: error.message});
       
    }
}

export const getAllContact =async(req,res)=>{
   try{
      const contacts= await Contact.find();
      res.status(200).json({success:true,contacts})

   } catch(error){
      res.status(500).json({ success: false, message: "server Error", error: error.message});
   }
}

export const getContactById=async(req,res)=>{
   try{
      const {id}= req.params;
      const contacts=await Contact.findById(id);
       if(!contacts){
        return res.status(404).json({ success: false, message: "Contact not foundr"});
       }
       res.status(200).json({ success: true, contacts});
   } catch(error){
      res.status(500).json({ success: false, message: "server Error", error: error.message});
   }
}

export const deleteContactById=async(req,res)=>{
  try{
    const {id} =req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if(!contact){
      return res.status(404).json({ success: false, message: "Contact not found"});
     }
     res.status(200).json({ success: true, message: "Contact deleted successfull"});
  }catch(error){
   res.status(500).json({ success: false, message: "server Error", error: error.message});
  }
}

export const updateContactById= async(req,res)=>{
   try{
    const {id}=req.params;
    const updatedData=await Contact.findByIdAndUpdate(id,req.body);
     
    if(!updatedData){
      return res.status(404).json({ success: false, message: "Contact not found"});
     }
     res.status(200).json({ success: true, message: "Contact updated successfull"});
   }catch(error){
      res.status(500).json({ success: false, message: "server Error", error: error.message});
   }
}

export const getContactsCount = async(req, res) => {
   try {
       // Get total count of all contacts
       const totalCount = await Contact.countDocuments();
       
       // Optional: Get counts by status
       const newCount = await Contact.countDocuments({ status: 'new' });
       const readCount = await Contact.countDocuments({ status: 'read' });
       const inProgressCount = await Contact.countDocuments({ status: 'in-progress' });
       const completedCount = await Contact.countDocuments({ status: 'completed' });
       
       res.status(200).json({
           success: true,
           counts: {
               total: totalCount,
               new: newCount,
               read: readCount,
               inProgress: inProgressCount,
               completed: completedCount
           }
       });
   } catch(error) {
       res.status(500).json({ 
           success: false, 
           message: "Server Error", 
           error: error.message
       });
   }
}