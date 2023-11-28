import Orcamentos from "@/app/core/Orcamentos"
import Input from "./input"
import { useEffect, useState } from "react"
import Button from "./button"
import { fetchPecaId } from "@/app/service/PecaService"
import Peca from "@/app/core/Peca"
import { fetchMaterialId } from "@/app/service/MaterialService"


interface FormProps {
    orcamentos: Orcamentos
    orcamentoChange?: (orcamentos: Orcamentos) => void
    cancelado?: () => void
}

export default function Form(props: FormProps) {
    const id = props.orcamentos?.id;
  const [tempoFabricacao, setTempoFabricacao] = useState(
    props.orcamentos?.tempoFabricacao
  );
  const [precoTotal, setPrecoTotal] = useState(props.orcamentos?.precoTotal);
  const [pecaId, setPecaId] = useState(props.orcamentos?.peca?.id || null); 
  const [peca, setPeca] = useState<Peca | null> (null);
  const [materialId, setMaterialId] = useState(props.orcamentos?.material?.id || null);
  const [material, setMaterial] = useState(props.orcamentos?.material);
  const [status, setStatus] = useState(props.orcamentos?.status);

    useEffect(() => {
        const loadPecaDetails = async () => {
          try {
            if (pecaId) {
              const pecaDetails = await fetchPecaId(pecaId);
              pecaDetails.orcamentos = [];
              setPeca(pecaDetails);
            }
          } catch (error) {
            console.error("Erro ao buscar detalhes da peça:", error);
          }
        };
    
        loadPecaDetails();
      }, [pecaId]);

      useEffect(() => {
        const loadMaterialDetails = async () => {
          try {
            if (materialId) {
              const materialDetails = await fetchMaterialId(materialId);
              setMaterial(materialDetails);
            }
          } catch (error) {
            console.error("Erro ao buscar detalhes do material:", error);
          }
        };
    
        loadMaterialDetails();
      }, [materialId]);

    return (<div>
        {id ? (<Input texto="id" valor={id} somenteLeitura ></Input>) : false}
        <Input texto="Tempo de Fabricação (H)" valor={tempoFabricacao} onChange={setTempoFabricacao}></Input>
        <Input texto="Preço Total (R$)" valor={precoTotal} onChange={setPrecoTotal}></Input>
        <Input texto="Peça Orçada" valor={pecaId} onChange={(newValue) => setPecaId(newValue)}></Input>
        <Input texto="Material Utilizado" valor={materialId} onChange={(newValue) => setMaterialId(newValue)}></Input>
        <Input texto="Status" valor={status} onChange={setStatus}></Input>
        <div className="flex justify-end mt-5" >
            <Button className="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700" onClick={() => props.orcamentoChange?.(new Orcamentos(
                id, tempoFabricacao, precoTotal, peca, material, status))}>
            {id ? 'Alterar' : 'Salvar'}
        </Button>
        <Button cor="bg-gradient-to-r from-gray-500 to-gray-700" onClick={props.cancelado}>
            Cancelar
        </Button>
    </div>
    </div >
    )
}