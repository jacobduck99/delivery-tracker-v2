import { loadRun, loadDeliveries, saveDeliveries} from "../../lib/storage/runStorage.js";
import { getDrops } from "../../lib/api/runApi.js";

//export async function loadDrops() {
 //   const run = loadRun("current_run");
   // if (!run) return { ok: false, error: "NO_RUN"};
    
  //  const runid = run.run_id;
   // const cache = loadDeliveries(runid) 
   // if (!cache) saveDeliveries(runid, data.deliveries);
   // const data = await getDrops(runid);
   // let deliveries = data?.deliveries ?? cache;

  //  if (deliveries === null ) {
   //     return { ok: false, error: "SERVER_FAIL"} 
    //}

  //  return { ok: true, runId: data.run_id, deliveries }

//}

export async function loadDrops() {
    const run = loadRun("current_run");
    if (!run) return { ok: false, error: "NO_RUN" };

    const runid = run.run_id;
    const cache = loadDeliveries(runid);
    if (cache !== null) { 
        return { ok: true, runId: runid, deliveries: cache} 
    }

    const data = await getDrops(runid);
    if (!data) return { ok: false, error: "SERVER_FAIL"}
    
    let deliveries = data.deliveries; 
    saveDeliveries(runid, deliveries);

    return { ok: true, runId: runid, deliveries: deliveries }
}



