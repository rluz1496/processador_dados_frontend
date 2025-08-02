import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('arquivo') as File

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'Nenhum arquivo enviado' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Simular processamento IA (aqui você integraria com sua IA real)
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Mock data para demonstração
    const mockUnidades = [
      {
        id: '1',
        Unidade: '101',
        Bloco: 'A',
        Nome: 'João Silva Santos',
        'CPF/CNPJ': '123.456.789-00',
        Celular: '(11) 99999-1111',
        Telefone: '(11) 3333-1111',
        'E-mail': 'joao.silva@email.com'
      },
      {
        id: '2',
        Unidade: '102',
        Bloco: 'A',
        Nome: 'Maria Oliveira',
        'CPF/CNPJ': '', // Crítico - faltando CPF
        Celular: '',
        Telefone: '(11) 3333-2222',
        'E-mail': 'maria.oliveira@email.com'
      },
      {
        id: '3',
        Unidade: '103',
        Bloco: 'A',
        Nome: 'Pedro Costa',
        'CPF/CNPJ': '555.666.777-88',
        Celular: '(11) 99999-3333',
        Telefone: '',
        'E-mail': '' // Incompleto - faltando email
      }
    ]

    return new Response(
      JSON.stringify({ unidades: mockUnidades }),
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