const {request, response} = require("express")
const pool = require("../db/connection")
const bcryptjs=require("bcryptjs");
const {mEmp, updateEmp} = require("../models/MaxPayne");

const getMaxPayne = async (req=request, res=response) => {
    let conn;
    try{
        conn = await pool.getConnection()
        const Nombre = await conn.query(mEmp.queryGetNombre,(error)=>{throw new error})
        if(!Nombre){
            res.status(404).json({msg:"No existe el Personaje"})
            return
        }
        const ID = await conn.query(mEmp.queryGetID,(error)=>{throw new error})
        if(!ID){
            res.status(404).json({msg:"El personaje no existe"})
            return
        }
        res.json({Personaje, ID})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}
//Obtener Ppersonaje por ID
const getEmpByID = async (req = request, res = response) =>{
    const {ID} = req.params
    let conn;
    try{ 
        conn = await pool.getConnection()
        const [Grupo] = await conn.query(mEmp.queryEmpByID,[ID],(error)=>{throw new error})
        if (!Personaje){
            res.status(404).json({msg: `El no existe el id ${ID} del personaje`})
            return
        }
        const [ID] = await conn.query(mEmp.queryWHByID,[id],(error)=>{throw new error})
        if (!ID){
            res.status(404).json({msg: `Sin ID ${ID} reconocido`})
            return
        }
        res.json({Personaje, ID})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
//Borrar un personaje
const deleteEmpbyID = async (req = request, res = response) =>{
    const {ID} = req.query
    let conn;
    try{ 
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(mEmp.queryDeleteEmpByID,[ID],(error)=>{throw new error})
        
        if (affectedRows === 0){
            res.status(404).json({msg: `No fue posible eliminar el personaje${ID}`})
            return
        }
        res.json({msg: `El personaje  ${ID} ha sido eliminado`})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
// Para actualizar un personaje
const reActiveEmpbyID = async (req = request, res = response) =>{
    const {ID} = req.query
    let conn;
    try{ 
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(mEmp.queryreActiveEmpByID,[id],(error)=>{throw new error})
        
        if (affectedRows === 0){
            res.status(404).json({msg: `No se actualizo el id ${id} en el registro`})
            return
        }
        res.json({msg: `Se actualizo el ID ${ID}`})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
//Añadir un nuevo personaje
const addEmp = async (req = request, res = response) =>{
    const {
        Nombre,
        ID,
        Cargo,
        Grupo,
        Enemigo_o_Alidado
    } = req.body
    if (
        !Nombre ||
        !ID||
        !Cargo ||
        !Grupo||
        !Enemigo_o_Alidado||
        !Creado ||
        !Modificado||
        !Activo
    ){ res.status(400).json({msg:"La informacion del personaje no esta completa"})}
    
    let conn;
    try{ 
        conn = await pool.getConnection()
        //No exista el personaje
        const [Personaje]=await conn.query(mEmp.queryEmpExists,[Nombre])
        if (Personaje){
            res.status(403).json({msg:`El Persoanje ${Nombre} ya se encuentra registrado`})
            return
        }


//Cambiar Grupo
const newGrupo = async (req=request,res=response)=>{
    const {
        Nombre,
        Cargo,
        Enemigo_o_Alidado
    }=req.body

    if(
        !Nombre||
        !Cargo||
        !Enemigo_o_Alidado
    ){
        res.status(400).json({msg:"Complete los datos"})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [Personaje]=await conn.query(mPersonaje.querynewgrupo,[Nombre])

        if(!Personaje || Personaje.Activo == 'MaxPayne'){
            let code = !Personaje ? 1: 2;
            res.status(403).json({msg:`Existen iguales, corrija porfavor`,errorCode:code})
            return
        }

        const datos = bcryptjs.compareSync(Grupo,Cargo.Nombre)

        if(!datos){
            res.status(403).json({msg:`Reintentelo`,errorCode:" No es posible registrar"})
            return
        }

        const registro = bcryptjs.genregistroSync()
        const Cargo = bcryptjs.hashSync(Cargo,registro) 

        const {affectedRows} = await conn.query(mPersonaje.queryUpdate[Cargo,Nombre],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`El ${Cargo} no se regitro `})
            return
        }
        res.json({msg:`El Cargo ${Cargo} se registro`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }

}


module.exports = {getMaxPayne, getEmpByID, deleteEmpbyID, addpersonaje, updateEmpByNombre, newGrupo, addID, updateIDByNombre, reActiveEmpbyID}
