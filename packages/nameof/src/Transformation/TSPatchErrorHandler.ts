import { TransformerExtras } from "ts-patch";
import type ts = require("typescript");
import { ErrorHandler } from "./ErrorHandler";

/**
 * Provides the functionality to handle errors using `ts-patch` components.
 */
export class TSPatchErrorHandler extends ErrorHandler
{
    /**
     * A set of tools for interacting with `ts-patch`.
     */
    private extras: TransformerExtras;

    /**
     * Initializes a new instance of the {@linkcode TSPatchErrorHandler} class.
     *
     * @param extras
     * A set of tools for interacting with `ts-patch`.
     */
    public constructor(extras: TransformerExtras)
    {
        super();
        this.extras = extras;
    }

    /**
     * @inheritdoc
     */
    protected get TypeScript(): typeof ts
    {
        return this.Extras.ts;
    }

    /**
     * Gets a set of tools for interacting with `ts-patch`.
     */
    protected get Extras(): TransformerExtras
    {
        return this.extras;
    }

    /**
     * @inheritdoc
     *
     * @param file
     * The file related to the error.
     *
     * @param node
     * The node related to the error.
     *
     * @param error
     * The error to process.
     */
    public Process(file: ts.SourceFile, node: ts.Node, error: Error): void
    {
        this.Extras.addDiagnostic(this.GetDiagnostic(file, node, error));
    }
}
