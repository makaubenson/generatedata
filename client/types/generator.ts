import {
	DataTypeGenerationOptions,
	ExportType,
	ExportTypeGenerationOptions
} from '../_plugins';
import { GDLocale } from '~types/general';
import { DTGenerateResult, DTGenerationData } from "~types/dataTypes";

export { CountryNameFiles } from '../_namePlugins';
export { DataTypeGenerationOptions, ExportType, ExportTypeGenerationOptions };

/**
 * Also the main public interface.
 *
 * Settings custom to the particular generation action. This is used in combination with DataSetConfig.
 */
export type GenerationSettings = {
	numRows: number;
	locale?: GDLocale;
	stripWhitespace?: boolean; // default: false

	// the default behaviour is to return the generated data. This option lets users generate a file instead. It's
	// far better for larger data sets
	target?: {
		filename?: string; // the filename to generate
		folder?: string; // the folder where the data is generated
	},
	packetSize?: number;
	onError?: (err: any) => void;
	onPacketComplete?: (result: any) => void;
}

/**
 * This is the public type for what users supply to the generation method.
 *
 * It types the structure of an entire data set for being generated: the rows of Data Types with their unique
 * options and whatever Export Type and settings have been chosen. This is the data structure generated by the
 * UI after constructing whatever the user wants.
 */
export type GDTemplate = {
	generationSettings: GenerationSettings;
	dataTemplate: DataTypeGenerationOptions[];
	exportSettings: ExportTypeGenerationOptions;
}

// Bad name but can't think of a better one. This is the interface required for the Data Type and Export Type
// code for performing a unit of generation. It's a consistent interface used by both web workers and node code
export type WorkerInterface = {
	context: 'worker' | 'node',
	send: (data: DTGenerationData) => void | DTGenerateResult;
	onSuccess?: (data: any) => void;
	onError?: (data: any) => void;
};

export type UnchangedGenerationData = {
	[colIndex: number]: string; // colIndex => row ID (unique GUID)
}

export type DataTypeWorkerInterface = {
	[dataType: string]: WorkerInterface;
};

export type DataTypeBatchGeneratedPayload = {
	completedBatchNum: number;
	numGeneratedRows: number;
	numResults: number;
	generatedData: any;
};