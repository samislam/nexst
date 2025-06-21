import axios from 'axios'

export async function getServerClient() {
  // Your logic and configurations...
  return axios.create({
    // Your custom config...
  })
}
