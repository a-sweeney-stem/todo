import { Config } from 'drizzle-kit';

export default {
    schema: './src/database/schema',
    out: './src/database/migrations',
    verbose: true,
    strict: true
} satisfies Config;