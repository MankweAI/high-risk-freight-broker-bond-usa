
import { validateAllScenarios } from '../lib/data/validator';
import { generateAllScenarios } from '../lib/data/generator';

console.log('--- Starting Data Validation ---');
const all = generateAllScenarios();
console.log(`Generated ${all.length} total scenarios.`);

const { valid, errors } = validateAllScenarios();

if (valid) {
    console.log('✅ All scenarios passed Zod validation.');

    // Preview a few
    console.log('\n--- Preview (First 3) ---');
    console.log(JSON.stringify(all.slice(0, 3), null, 2));

    process.exit(0);
} else {
    console.error('❌ Validation Failed:');
    errors.forEach(e => console.error(e));
    process.exit(1);
}
