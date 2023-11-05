import React, { useState, useEffect } from 'react'
import './lista.css'

const Lista = () => {

    

    const [array, setArray] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=>{
        fetch("http://localhost:8080/api/").then((res)=>{
            return res.json()
        }).then((resData)=>{
            console.log(resData)
            const nomes = resData.map((e) => e)
            setArray(nomes)
        }).catch(error => {
            console.error('Erro na solicitação:', error)
        })
    }, [])

    const edit = (id, senha)=>{
        const senhaDigitada = prompt('digite a senha da empresa')
        if(senha === senhaDigitada){
            window.location.href = `/edicao/${id}`
        }
    }

    const Delete = (id, senha)=>{
        const senhaDigitada = prompt('digite a senha da empresa')
        if(senha === senhaDigitada){
            fetch(`http://localhost:8080/api/${id}`, {
                method: 'DELETE',
                headers:  {
                    'Content-Type': 'application/json',
                }
            }).catch((error) => {
              console.error('Erro na solicitação:', error)
            })
            window.location.reload()
        }else{
            alert("senha incorreta")
        }
    }

    return (
        <main className='mainLista'>
            <h1>Tabela de Empresas</h1>
            <div className='search-container'>
                <input
                    className='search-input'
                    type="text"
                    placeholder="digite o cnpj sem pontuação"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            <i className="fas fa-search search-icon"></i>
            <button onClick={()=>{window.location.reload()}} className='btnAtt'>atualizar</button>
            </div>
            <ul className='empresaUl'>
            {array
                .filter((e)=>(
                    e.cnpj.replace(/\D/g, '').toLowerCase().includes(searchTerm.toLowerCase())
                ))
                .map((e, i) => (
                <li key={i} className='empresaLi'>
                    <table className='tabelaLista'>
                        <thead>
                            <tr>
                                <th>Nome do Cliente</th>
                                <th>Razão Social</th>
                                <th>Email</th>
                                <th>CNPJ</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{e.nome_do_cliente}</td>
                                <td>{e.rezao_social}</td>
                                <td>{e.email}</td>
                                <td>{e.cnpj}</td>
                                <td>{e.telefone}</td>
                            </tr>
                            <tr>
                                <td colSpan="5">Endereço: {e.endereco.nome_da_rua}, {e.endereco.numero} - CEP: {e.endereco.cep}</td>
                            </tr>
                            <tr>
                                <td className="button-container">
                                    <button className="edit-button" onClick={()=>{edit(e.id, e.senha)}}>
                                        <span className="button-icon">&#9998;</span> Editar
                                    </button>
                                    <button className="delete-button" onClick={()=>{Delete(e.id, e.senha)}}>
                                        <span className="button-icon">&#128465;</span> Excluir
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            ))}
            </ul>
        </main>
    )
}

export default Lista