import {
  SerializableObject,
  DeserializedObject,
  SerializedObject,
  Definitions
} from "./serializable-object";

// https://pkg.go.dev/github.com/filecoin-project/specs-actors@v0.9.13/actors/runtime/proof#PoStProof

interface PoStProofConfig {
  properties: {
    postProof: {
      type: number;
      serializedType: number;
      serializedName: "PoStProof";
    };
    proofBytes: {
      type: Buffer;
      serializedType: string;
      serializedName: "ProofBytes";
    };
  };
}

type C = PoStProofConfig;

class PoStProof extends SerializableObject<C> implements DeserializedObject<C> {
  get config(): Definitions<C> {
    return {
      postProof: {
        deserializedName: "postProof",
        serializedName: "PoStProof",
        defaultValue: 0
      },
      proofBytes: {
        deserializedName: "proofBytes",
        serializedName: "ProofBytes",
        defaultValue: literal =>
          literal ? Buffer.from(literal, "base64") : Buffer.from([0])
      }
    };
  }

  constructor(
    options?: Partial<SerializedObject<C>> | Partial<DeserializedObject<C>>
  ) {
    super();

    this.postProof = super.initializeValue(this.config.postProof, options);
    this.proofBytes = super.initializeValue(this.config.proofBytes, options);
  }

  postProof: number;
  proofBytes: Buffer;
}

type SerializedPoStProof = SerializedObject<C>;

export { PoStProof, SerializedPoStProof };
