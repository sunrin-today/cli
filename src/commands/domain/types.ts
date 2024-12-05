enum DomainType {
	A = 'A',
	AAAA = 'AAAA',
	CNAME = 'CNAME',
	CAA = 'CAA',
	DS = 'DS',
	MX = 'MX',
	NS = 'NS',
	SRV = 'SRV',
	TXT = 'TXT',
	URI = 'URI'
}

interface DomainResponse {
	type: DomainType;
}

enum TTLType {
	AUTO = 'Auto',
	ONE_MINUTE = '1 min',
	TWO_MINUTE = '2 min',
	FIVE_MINUTE = '5 min',
	TEN_MINUTE = '10 min',
	FIFTEEN_MINUTE = '15 min',
	THIRTY_MINUTE = '30 min',
	ONE_HOUR = '1 hour',
	TWO_HOUR = '2 hour',
	FIVE_HOUR = '5 hour',
	TWELVE_HOUR = '12 hour',
	ONE_DAY = '1 day',
}

enum CAATag {
	ISSUE = 'Only allow specific hostnames',
	ISSUEWILD = 'Only allow wildcards',
	IODEF = 'Send violation reports to URL (http:, https:, or mailto:)'
}

export { DomainType, DomainResponse, TTLType, CAATag };
