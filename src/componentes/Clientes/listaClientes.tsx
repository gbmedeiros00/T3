import { useState } from "react";
import FormCadastroCliente from "./formCadastroCliente";

type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: string;
    rg: string;
    dataCadastro: string;
    email: string;
    telefone: string;
};

type Props = {
    tema: string;
};

function ListaCliente({ tema }: Props) {
    const [clientes, setClientes] = useState<Cliente[]>([
        {
            id: 1,
            nome: "Gabriel Calebe",
            nomeSocial: "Calebe",
            cpf: "123.456.789-00",
            rg: "12.345.678-9",
            dataCadastro: "2024-06-01",
            email: "c1@email.com",
            telefone: "1111-1111"
        },
        {
            id: 2,
            nome: "Cliente 2",
            nomeSocial: "Cliente Dois",
            cpf: "987.654.321-00",
            rg: "98.765.432-1",
            dataCadastro: "2024-06-15",
            email: "c2@email.com",
            telefone: "2222-2222"
        },
    ]);
    const [modalAberto, setModalAberto] = useState(false);
    const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

    const abrirModalNovo = () => {
        setModalAberto(true);
        setClienteEditando(null);
    };

    const abrirModalEditar = (cliente: Cliente) => {
        setModalAberto(true);
        setClienteEditando(cliente);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setClienteEditando(null);
    };

    const excluirCliente = (id: number) => {
        setClientes(prev => prev.filter(c => c.id !== id));
    };

    const handleSubmitCliente = (dados: { nome: string; nomeSocial: string; cpf: string; rg: string; dataCadastro: string; email: string; telefone: string }) => {
        if (clienteEditando) {
            setClientes(prev =>
                prev.map(c =>
                    c.id === clienteEditando.id
                        ? { ...c, ...dados }
                        : c
                )
            );
        } else {
            const novoCliente: Cliente = {
                id: clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1,
                nome: dados.nome,
                nomeSocial: dados.nomeSocial,
                cpf: dados.cpf,
                rg: dados.rg,
                dataCadastro: dados.dataCadastro,
                email: dados.email,
                telefone: dados.telefone,
            };
            setClientes(prev => [...prev, novoCliente]);
        }
        setModalAberto(false);
        setClienteEditando(null);
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Clientes</h2>
                <button className="btn btn-primary" onClick={abrirModalNovo}>
                    Novo Cliente
                </button>
            </div>
            <ul className="list-group">
                {clientes.map(cliente => (
                    <li
                        key={cliente.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={cliente.id === 4 ? { backgroundColor: tema } : {}}
                    >
                        <span>
                            <strong>{cliente.nome}</strong>
                            {cliente.nomeSocial && <> ({cliente.nomeSocial})</>}
                            {cliente.cpf && <> - CPF: {cliente.cpf}</>}
                            {cliente.rg && <> - RG: {cliente.rg}</>}
                            {cliente.dataCadastro && <> - Cadastro: {cliente.dataCadastro}</>}
                            {cliente.email && <> - {cliente.email}</>}
                            {cliente.telefone && <> - {cliente.telefone}</>}
                        </span>
                        <div>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => abrirModalEditar(cliente)}
                            >
                                Atualizar
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => excluirCliente(cliente.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {modalAberto && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {clienteEditando ? "Atualizar Cliente" : "Novo Cliente"}
                                </h5>
                                <button type="button" className="btn-close" onClick={fecharModal}></button>
                            </div>
                            <div className="modal-body">
                                <FormCadastroCliente
                                    cliente={clienteEditando ? {
                                        nome: clienteEditando.nome,
                                        nomeSocial: clienteEditando.nomeSocial,
                                        cpf: clienteEditando.cpf,
                                        rg: clienteEditando.rg,
                                        dataCadastro: clienteEditando.dataCadastro,
                                        email: clienteEditando.email,
                                        telefone: clienteEditando.telefone,
                                    } : undefined}
                                    onSubmit={handleSubmitCliente}
                                    onCancel={fecharModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListaCliente;