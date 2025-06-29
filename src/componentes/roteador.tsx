import { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./Clientes/listaClientes";
import ListaPets from "./Pets/listaPets";
import ListaProdutos from "./Produtos/listaProdutos";
import ListaServicos from "./Servicos/listaServicos";
import ListaRelatorios from "./Relatorios/listaRelatorios";
import RegistrarConsumo from "./Consumo/registrarConsumo";

function Roteador() {
    const [tela, setTela] = useState('Clientes');

    function selecionarView(novaTela: string, evento: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        evento.preventDefault();
        setTela(novaTela);
    }

    const barraNavegacao = (
        <BarraNavegacao
            seletorView={selecionarView}
            tema="#e3f2fd"
            botoes={['Clientes', 'Pets', 'Produtos', 'Serviços', 'Consumo', 'Relatórios']}
        />
    );

    if (tela === 'Clientes') {
        return (
            <>
                {barraNavegacao}
                <ListaCliente tema="#e3f2fd" />
            </>
        );
    } else if (tela === 'Pets') {
        return (
            <>
                {barraNavegacao}
                <ListaPets tema="#e3f2fd" />
            </>
        );
    } else if (tela === 'Produtos') {
        return (
            <>
                {barraNavegacao}
                <ListaProdutos tema="#e3f2fd" />
            </>
        );
    } else if (tela === 'Serviços') {
        return (
            <>
                {barraNavegacao}
                <ListaServicos tema="#e3f2fd" />
            </>
        );
    } else if (tela === 'Consumo') {
        return (
            <>
                {barraNavegacao}
                <RegistrarConsumo tema="#e3f2fd" />
            </>
        );
    } else if (tela === 'Relatórios') {
        return (
            <>
                {barraNavegacao}
                <ListaRelatorios tema="#e3f2fd" />
            </>
        );
    } else {
        return barraNavegacao;
    }
}

export default Roteador;