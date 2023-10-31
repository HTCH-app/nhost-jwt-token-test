import { NhostClient } from "@nhost/nhost-js";

export const nhost = new NhostClient({
  subdomain: 'local',
});