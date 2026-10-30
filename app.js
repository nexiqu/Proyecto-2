const db = supabase.createClient('https://ilimuysczqdsxwkjaafl.supabase.co', 'sb_publishable_9ihNwsm399Kc0OafvRugEQ_B_SG_5bK')

const formulario = document.querySelector('#formulario')
const lista = document.querySelector('#lista')

async function mostrar() {
  const { data, error } = await db.from('actividades').select('*').order('id')
  if (error) { alert(error.message); return }
  lista.innerHTML = ''
  for (const fila of data) {
    const item = document.createElement('li')
    item.textContent = fila.nombre + ' · ' + fila.barrio
    lista.append(item)
  }
}

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()
  const nueva = {
    nombre: document.querySelector('#nombre').value,
    barrio: document.querySelector('#barrio').value,
  }
  const { error } = await db.from('actividades').insert(nueva)
  if (error) { alert(error.message); return }
  formulario.reset()
  mostrar()
})

mostrar()
