export default function validateNewProduct(values){

    const errors = {};

    if(!values.name){
        errors.name = "Name is required";
    }
    if(!values.enterprise){
        errors.enterprise = "Enterprise is required";
    }
    
    if(!values.url){
        errors.url = "URL is required";
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)){
        errors.url = "URL must start with http or https";
    }
    if(!values.description){
        errors.description = "Description is required";
    }

    return errors;
}