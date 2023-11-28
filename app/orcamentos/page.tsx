'use client';
import { useState } from "react";
import Button from "../components/orcamentos/button";
import Form from "../components/orcamentos/form";
import Layout from "../components/orcamentos/layout"
import Table from "../components/orcamentos/table"
import Orcamentos from "../core/Orcamentos"
import { useEffect } from "react";
import { createOrcamento, deleteOrcamento, fetchOrcamentos, updateOrcamento } from "../service/OrcamentoService";

export default function OrcamentosPage() {

    // const orcamentos = Orcamentos.geraOrcamentosMock()
    const [display, setDisplay] = useState<'table' | 'form'>('table')
    const [orcamento, setOrcamento] = useState<Orcamentos>(Orcamentos.vazio())
    const [orcamentos, setOrcamentos] = useState<Orcamentos[]>([])

    useEffect(() => {
        if (display === 'table') {
            const loadOrcamentos = async () => {
                try {
                    const dados = await fetchOrcamentos();
                    setOrcamentos(dados);
                } catch (error) {
                    console.error("Erro ao buscar orcamentos:", error);
                }
            }
            loadOrcamentos();
        }
    }, [display]);


    function orcamentoSelect(orcamento: Orcamentos) {
        setOrcamento(orcamento)
        setDisplay("form")
    }

    async function orcamentoRemoved(orcamento: Orcamentos) {
        const confirm =
            window.confirm("Tem certeza de que deseja excluir este orçamento?");
        if (confirm) {
            try {
                if (orcamento.id !== null) {
                    await deleteOrcamento(orcamento.id);
                } else {
                    console.error("OrcamentoId é null!");
                }
                setOrcamentos(prevOrcamentos => prevOrcamentos.filter(or => or.id !== orcamento.id));
            } catch (error) {
                console.error("Erro ao excluir evento:", error);
            }
        }
    }

    async function orcamentoSave(orcamento: Orcamentos) {
        try {
            const newOrcamento = await createOrcamento(orcamento);
            setDisplay("table");
        } catch (error) {
            console.error("Erro ao salvar orçamento:", error);
        }
    }

    async function orcamentoUpdate(orcamento: Orcamentos) {
        console.log(orcamento)
        try {
            const orcamentosUpdated = await updateOrcamento(orcamento);
            setDisplay("table");
        } catch (error) {
            console.error("Erro ao atualizar orçamentos:", error);
        }
    }

    function orcamentoNew() {
        setOrcamento(Orcamentos.vazio())
        setDisplay("form")
    }

    function saveOrUpdateOrcamento(orcamento: Orcamentos) {
        console.log(orcamento)
        if (orcamento.id) {
            orcamentoUpdate(orcamento)
        } else {
            orcamentoSave(orcamento)
        }
    }

    return (
        <div className={`flex justify-center items-center h-screen bg-blue-100 text-white`}>
            <Layout title="Cadastro de Orçamentos">
                {display === 'table' ? (
                    <> <div className="flex justify-end">
                        <Button className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                            onClick={() => orcamentoNew()}>
                            Novo orçamento </Button>
                    </div>
                        <Table orcamentos={orcamentos}
                            orcamentoSelect={orcamentoSelect}
                            orcamentoRemoved={orcamentoRemoved}></Table>
                    </>
                ) : (<Form orcamentos={orcamento}
                    orcamentoChange={saveOrUpdateOrcamento}
                    cancelado={() => setDisplay('table')} />)}
            </Layout>
        </div>
    )
}