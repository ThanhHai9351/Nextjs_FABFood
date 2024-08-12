import {z} from 'zod'

const configSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT : z.string()
})

const configProject = configSchema.safeParse(process.env)

if(!configProject.success)
{
    console.error(configProject.error.issues)
    throw new Error('Các giá trị trong fiel khai báo env không hợp lệ')
}

const envConfig = configProject.data

export default envConfig