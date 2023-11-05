import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import InputMask from 'react-input-mask'
import { cpf } from 'cpf-cnpj-validator'

const Form= () => {

    const [cep, setCep] = useState("")

    const {
        register, 
        handleSubmit, 
        formState:{errors},
        setValue,
        setError 
    } = useForm()

    function onSubmit(data){

        
        if (cpf.isValid(data.cnpj.replace(/[^\d]+/g, ''))) {
            fetch("http://localhost:8080/api", {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).catch((error) => {
              console.error('Erro na solicitação:', error)
            })
            window.location.href = `/lista`
        }else{
            setError("cnpj", {type: 'manual', message: "cnpj inválido"})
        }

    }

    useEffect(() => {
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => response.json())
            .then((data) => {
                setValue('endereco', data.logradouro)
            })
            .catch((error) => {
              console.error('Erro na solicitação:', error)
            })
        }
      }, [cep])

    return(
        <div className='form-container'>
            <div className='form'>
                <div>
                    <label htmlFor="nomeCliente">nome do cliente
                        <input
                            className={errors?.nomeCliente && "input-error"}
                            type="text" id="nomeCliente"
                            {...register("nomeCliente", {required: true})}
                        />
                        {errors?.nomeCliente?.type === "required" && (<p>campo não preenchido</p>)}
                    </label>
                    <label htmlFor="senha">senha
                        <input
                            className={errors?.senha && "input-error"}
                            type="password" id="senha"
                            {...register("senha", {required: true})}
                        />
                        {errors?.senha?.type === "required" && (<p>campo não preenchido</p>)}
                    </label>
                    <label htmlFor="nomeEmpresa">nome da empresa
                        <input
                            className={errors?.nomeEmpresa && "input-error"}
                            type="text" id="nomeEmpresa"
                            {...register("nomeEmpresa", {required: true})}
                        />
                        {errors?.nomeEmpresa?.type === "required" && (<p>campo não preenchido</p>)}
                    </label>
                </div>
                <div>
                    <label htmlFor="cnpj">cnpj
                        <InputMask
                            mask="99.999.999/9999.99"
                            maskChar="_"
                            className={errors?.cnpj && "input-error"}
                            type="text" id="cnpj"
                            {...register("cnpj", {required: "campo não preenchido"})}
                        />
                        {errors?.cnpj && (<p>{errors.cnpj.message}</p>)}
                    </label>
                    <label htmlFor="cep">cep
                        <input
                            className={errors?.cep && "input-error"}
                            type="text" id="cep"
                            maxLength="8"
                            {...register("cep", {required: true})}
                            onChange={(e)=>{setCep(e.target.value)}}
                        />
                        {errors?.cep?.type === "required" && (<p>campo não preenchido</p>)}
                    </label>
                    <label htmlFor="endereco">rua
                        <input
                            className={errors?.endereco && "input-error"}
                            type="text" id="endereco"
                            {...register("endereco", {required: true})}
                        />
                        {errors?.endereco?.type === "required" && (<p>campo não preenchido</p>)}
                    </label>
                </div>
                <div>
                    <label htmlFor="numero">numero
                        <input
                            className={errors?.numero && "input-error"}
                            type="number" id="numero"
                            {...register("numero", {required: true})}
                        />
                        {errors?.numero?.type === "required" && (<p>campo não preenchido</p>)}
                    </label>
                    <label htmlFor="telefone">telefone
                        <InputMask 
                            mask="+55 (99) 99999-9999"
                            maskChar="_"
                            className={errors?.telefone && "input-error"}
                            type="text" id="telefone"
                            {...register("telefone", {required: true})}
                        />
                        {errors?.telefone?.type === "required" && (<p>campo não preenchido</p>)}
                    </label>
                    <label htmlFor="email">email
                        <input
                            className={errors?.email && "input-error"}
                            type="text" id="email"
                            {...register("email", {
                                required: "campo não preenchido",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'E-mail não é válido'
                                }
                            })}
                        />
                        {errors?.email && (<p>{errors.email.message}</p>)}
                    </label>
                </div>
                <button onClick={()=>{handleSubmit(onSubmit)()}} className='criar'>criar conta</button>
            </div>
        </div>
    )
}

export default Form