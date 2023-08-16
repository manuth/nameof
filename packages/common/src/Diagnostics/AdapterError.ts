import { NameofError } from "./NameofError";
import { IAdapter } from "../Transformation/IAdapter";

/**
 * Represents an error that occurred in an adapter.
 *
 * @template TInput
 * The type of the input of the adapter.
 *
 * @template TOutput
 * The type of the output of the adapter.
 */
export abstract class AdapterError<TInput, TOutput> extends NameofError
{
    /**
     * The adapter which caused the error.
     */
    private adapter: IAdapter<TInput, TOutput>;

    /**
     * The node related to the error.
     */
    private node: TInput;

    /**
     * Initializes a new instance of the {@linkcode AdapterError} class.
     *
     * @param adapter
     * The adapter which caused the error.
     *
     * @param node
     * The node related to the error.
     */
    public constructor(adapter: IAdapter<TInput, TOutput>, node: TInput)
    {
        super();
        this.adapter = adapter;
        this.node = node;
    }

    /**
     * @inheritdoc
     */
    public get Action(): () => void
    {
        return () => this.Report();
    }

    /**
     * Gets the adapter which caused the error.
     */
    protected get Adapter(): IAdapter<TInput, TOutput>
    {
        return this.adapter;
    }

    /**
     * Gets the node related to the error.
     */
    protected get Node(): TInput
    {
        return this.node;
    }

    /**
     * Gets the source code which caused the error.
     */
    protected get SourceCode(): string
    {
        return this.Adapter.ExtractCode(this.Adapter.Extract(this.Node));
    }

    /**
     * The message of the error.
     */
    protected abstract get Message(): string;

    /**
     * Reports the error.
     */
    protected Report(): void
    {
        this.Adapter.HandleError(new Error(this.Message), this.Node);
    }
}
