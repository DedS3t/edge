export class CreateJobDto {
  readonly jwt: string;
  readonly uuid: string; // requester identifier
  readonly mem: number; // kb
  readonly cpu: number; // cpu points
  readonly nodes: number;
  readonly timeout: number; // ms
}