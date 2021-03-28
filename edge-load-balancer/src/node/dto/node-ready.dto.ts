export class NodeReadyDto {
  readonly jwt: string;
  readonly host: string;
  readonly port: number;
  readonly job_uuid: string;
}