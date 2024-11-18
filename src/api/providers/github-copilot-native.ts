import { Anthropic } from "@anthropic-ai/sdk"
import { ApiHandler } from "../"
import {
	ApiHandlerOptions,
	ModelInfo,
	githHubCopilotNativeDefaultModelId,
	GithHubCopilotNativeModelId,
	githHubCopilotNativeModels,
} from "../../shared/api"
import { convertToOpenAiMessages } from "../transform/openai-format"
import { ApiStream } from "../transform/stream"

export class GithHubCopilotNativeHandler implements ApiHandler {
	private options: ApiHandlerOptions

	constructor(options: ApiHandlerOptions) {
		this.options = options
	}

	async *createMessage(systemPrompt: string, messages: Anthropic.Messages.MessageParam[]): ApiStream {
		const openAiMessages = convertToOpenAiMessages(messages)
		// Placeholder for actual API call to GitHub Copilot
		for (const message of openAiMessages) {
			yield {
				type: "text",
				text: message.content || "",
			}
		}
	}

	getModel(): { id: GithHubCopilotNativeModelId; info: ModelInfo } {
		const modelId = this.options.apiModelId
		if (modelId && modelId in githHubCopilotNativeModels) {
			const id = modelId as GithHubCopilotNativeModelId
			return { id, info: githHubCopilotNativeModels[id] }
		}
		return { id: githHubCopilotNativeDefaultModelId, info: githHubCopilotNativeModels[githHubCopilotNativeDefaultModelId] }
	}
}
