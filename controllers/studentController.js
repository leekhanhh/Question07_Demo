
const Account = require("../models/account");
const Student = require("../models/student");
const ACCOUNT_TYPE_STUDENT = 1;

const save = async (req,res) => {
    let{
        studentId,
        major,
        schoolYear,
        fullName,
        email,
        phone,
        avatar,
        address,
        birthDate
    } = req.body;

    if(!studentId ||
        !major ||
        !schoolYear ||
        !fullName ||
        !email ||
        !phone ||
        !avatar ||
        !address ||
        !birthDate) {
        res.status(400).json({message : "Missing required field"});
        return;
    }
    
    let checkStudentExist = false;
    await Student.findOne({ studentId: studentId}).then((doc)=>{
        if (doc) {
            checkStudentExist = true;
        } else {
            checkStudentExist = false;
        }
    }).catch((err) => {
        checkStudentExist = false;
        console.log(err)
    })

    if(checkStudentExist){
        res.status(400).json({message:"StudentID existed"});
        return;
    }
    const newAccount = new Account({
        fullName,
        email,
        phone,
        avatarPath: avatar,
        birthDate,
        address,
        kind: ACCOUNT_TYPE_STUDENT,
    });
    
    await newAccount.save().then(async (docAccount) => {
        const newStudent = new Student({
            account: docAccount,
            studentId,
            major,
            schoolYear,
            isRegistered: false,
            isLeader: false,
        });
    
        await newStudent.save().then(async (docStudent)=>{
            res.status(201).json(docStudent);
            return;
        }).catch((err) => {
            console.log(1)
            res.status(500).json({message: err.message});
            return;
        });
    }).catch((err)=>{
        console.log(2)
        res.status(500).json({message: err.message});
        return;
    });

    
}

module.exports = {
    save
}

