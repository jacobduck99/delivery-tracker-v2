import { loadRun, loadDeliveries, saveDeliveries} from "../../lib/storage/runStorage.js";
import { getDrops } from "../../lib/api/runApi.js";

export async function loadDrops() {
    const run = loadRun("current_run");
    if (!run) return { ok: false, error: "NO_RUN" };

    const runid = run.run_id;
    const data = await getDrops(runid);

    if (!data) return { ok: false, error: "SERVER_FAIL" };

    const cache = loadDeliveries(runid);
    const deliveries = cache ?? data.deliveries;

    if (!cache) saveDeliveries(runid, data.deliveries);

    return {
        ok: true,
        runId: data.run_id,
        deliveries
    };
}

