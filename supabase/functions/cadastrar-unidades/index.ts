import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { unidades } = await req.json()

    if (!unidades || !Array.isArray(unidades)) {
      return new Response(
        JSON.stringify({ error: 'Dados de unidades inválidos' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Verificar se há linhas críticas (sem CPF/CNPJ ou Unidade)
    const hasCritical = unidades.some(unit => !unit['CPF/CNPJ'] || !unit.Unidade)
    
    if (hasCritical) {
      return new Response(
        JSON.stringify({ error: 'Não é possível cadastrar unidades com dados críticos faltando' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Simular cadastro no banco de dados
    await new Promise(resolve => setTimeout(resolve, 2000))

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `${unidades.length} unidades cadastradas com sucesso` 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})